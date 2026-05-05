import { db } from "@/db/connection";
import { projectMembers, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const getProjectMembersService = async (
  projectId: string,
  userId: string,
) => {
  // 1. Check access
  const [member] = await db
    .select()
    .from(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, userId),
      ),
    );

  if (!member) {
    throw new Error("Access denied");
  }

  // 2. Fetch members
  const members = await db
    .select({
      userId: users.id,
      name: users.name,
      email: users.email,
      avatar: users.avatar,
      role: projectMembers.role,
      joinedAt: projectMembers.joinedAt,
    })
    .from(projectMembers)
    .innerJoin(users, eq(projectMembers.userId, users.id))
    .where(eq(projectMembers.projectId, projectId));

  return members;
};


export const removeMemberService = async (
  projectId: string,
  currentUserId: string,
  memberId: string
) => {

  // 1. Check current user role
  const [currentUser] = await db
    .select()
    .from(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, currentUserId)
      )
    );

  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("Only admin can remove members");
  }

  // 2. Prevent self-removal (optional)
  if (currentUserId === memberId) {
    throw new Error("You cannot remove yourself");
  }

  // 3. Remove member
  const deleted = await db
    .delete(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, memberId)
      )
    )
    .returning();

  if (deleted.length === 0) {
    throw new Error("Member not found");
  }

  return true;
};

export const updateMemberRoleService = async (
  projectId: string,
  currentUserId: string,
  memberId: string,
  role: string
) => {

  // 1. Validate role
  if (!["ADMIN", "MEMBER"].includes(role)) {
    throw new Error("Invalid role");
  }

  // 2. Check current user role
  const [currentUser] = await db
    .select()
    .from(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, currentUserId)
      )
    );

  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("Only admin can update roles");
  }

  // 3. Prevent self role change
  if (currentUserId === memberId) {
    throw new Error("You cannot change your own role");
  }

  // 4. Update role
  const [updated] = await db
    .update(projectMembers)
    .set({ role })
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, memberId)
      )
    )
    .returning();

  if (!updated) {
    throw new Error("Member not found");
  }

  return updated;
};