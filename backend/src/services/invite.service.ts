import { db } from "@/db/connection";
import { projectInvites, projectMembers } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";
import { sendInviteEmail } from "@/utils/nodemailer";

export const inviteMemberService = async (
  projectId: string,
  userId: string,
  email: string,
) => {
  // 1. Check admin
  const [member] = await db
    .select()
    .from(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, userId),
      ),
    );

  if (!member || member.role !== "ADMIN") {
    throw new Error("Only admin can invite");
  }

  // 2. Generate token
  const token = crypto.randomBytes(32).toString("hex");

  // 3. Create invite
  const [invite] = await db
    .insert(projectInvites)
    .values({
      email,
      projectId,
      invitedBy: userId,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
    })
    .returning();

  const inviteLink = `http://localhost:5173/invite/${token}`;
  // send invite email to user
  await sendInviteEmail(email, inviteLink);

  return invite;
};


// accept invite
export const acceptInviteService = async (
  token: string,
  userId: string
) => {

  return await db.transaction(async (tx) => {

    // 1. Find invite
    const [invite] = await tx
      .select()
      .from(projectInvites)
      .where(eq(projectInvites.token, token));

    if (!invite) {
      throw new Error("Invalid invite link");
    }

    // 2. Check status
    if (invite.status !== "pending") {
      throw new Error("Invite already used");
    }

    // 3. Check expiry
    if (new Date() > invite.expiresAt) {
      throw new Error("Invite expired");
    }

    // 4. Add user to project
    await tx.insert(projectMembers).values({
      userId,
      projectId: invite.projectId,
      role: invite.role,
    });

    // 5. Update invite status
    await tx
      .update(projectInvites)
      .set({ status: "accepted" })
      .where(eq(projectInvites.id, invite.id));

    return {
      projectId: invite.projectId,
    };
  });
};