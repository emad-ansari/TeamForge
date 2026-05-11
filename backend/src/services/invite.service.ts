import { db } from "@/db/connection";
import { projectInvites, projectMembers, users } from "@/db/schema";
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

  // 2. Check if user already exists and is a member
  const [targetUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (targetUser) {
    const [existingMember] = await db
      .select()
      .from(projectMembers)
      .where(
        and(
          eq(projectMembers.projectId, projectId),
          eq(projectMembers.userId, targetUser.id)
        )
      );

    if (existingMember) {
      throw new Error("User is already a member of this project");
    }
  }

  // 3. Check for existing pending invite
  const [existingInvite] = await db
    .select()
    .from(projectInvites)
    .where(
      and(
        eq(projectInvites.projectId, projectId),
        eq(projectInvites.email, email),
        eq(projectInvites.status, "pending")
      )
    );

  if (existingInvite) {
    throw new Error("A pending invitation already exists for this email");
  }

  // 4. Generate token
  const token = crypto.randomBytes(32).toString("hex");

  // 5. Create invite
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
    console.log('accept invite service')
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

    // 4. Check if already a member
    const [existingMember] = await tx
      .select()
      .from(projectMembers)
      .where(
        and(
          eq(projectMembers.projectId, invite.projectId),
          eq(projectMembers.userId, userId)
        )
      );

    if (existingMember) {
      // If already a member, we can just mark the invite as accepted and return success
      // Or throw an error. Throwing an error is safer to let the user know they are already in.
      throw new Error("You are already a member of this project");
    }

    // 5. Add user to project
    await tx.insert(projectMembers).values({
      userId,
      projectId: invite.projectId,
      role: invite.role,
    });

    // 6. Update invite status
    await tx
      .update(projectInvites)
      .set({ status: "accepted" })
      .where(eq(projectInvites.id, invite.id));

    return {
      projectId: invite.projectId,
    };
  });
};