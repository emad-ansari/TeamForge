import { db } from "@/db/connection";
import { projects, projectMembers, tasks, users } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";

export const createProjectService = async (
  userId: string,
  name: string,
  description: string,
  themeColor: string,
) => {
  // 1. Create project
  const [project] = await db
    .insert(projects)
    .values({
      name,
      description,
      createdBy: userId,
      themeColor: themeColor,
    })
    .returning();

  // 2. Add creator as ADMIN
  await db.insert(projectMembers).values({
    userId,
    projectId: project.id,
    role: "ADMIN",
  });

  return project;
};

export const getProjectByIdService = async (
  projectId: string,
  userId: string,
) => {
  // 1. Check membership + get role
  const [membership] = await db
    .select({
      role: projectMembers.role,
    })
    .from(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, userId),
      ),
    );

  if (!membership) {
    throw new Error("Access denied");
  }

  // 2. Get project
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId));

  if (!project) {
    throw new Error("Project not found");
  }

  return {
    project,
    role: membership.role,
  };
};

export const getUserProjectsService = async (userId: string) => {
  const data = await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      themeColor: projects.themeColor,
      updatedAt: projects.updatedAt,

      role: projectMembers.role,

      // total tasks
      totalTasks: sql<number>`count(${tasks.id})`,

      // completed tasks
      completedTasks: sql<number>`
        count(case when ${tasks.status} = 'done' then 1 end)
      `,
    })
    .from(projectMembers)
    .innerJoin(projects, eq(projectMembers.projectId, projects.id))
    .leftJoin(tasks, eq(tasks.projectId, projects.id))
    .where(eq(projectMembers.userId, userId))
    .groupBy(projects.id, projectMembers.role);

  // 👉 calculate progress in JS (cleaner)
  return data.map((project) => {
    const progress =
      project.totalTasks === 0
        ? 0
        : Math.round((project.completedTasks / project.totalTasks) * 100);

    return {
      ...project,
      progress,
    };
  });
};

export const getProjectMembersMap = async (projectIds: string[]) => {
  const members = await db
    .select({
      projectId: projectMembers.projectId,
      userId: users.id,
      name: users.name,
      avatar: users.avatar,
    })
    .from(projectMembers)
    .innerJoin(users, eq(projectMembers.userId, users.id));

  // group by projectId
  const map: Record<string, { name: string; avatar: string | null }[]> = {};

  members.forEach((m) => {
    if (!map[m.projectId]) map[m.projectId] = [];
    map[m.projectId].push({name: m.name, avatar: m.avatar});
  });

  return map;
};

export const getUserProjectsWithDetails = async (userId: string) => {
  const projects = await getUserProjectsService(userId);

  const projectIds = projects.map((p) => p.id);

  const membersMap = await getProjectMembersMap(projectIds);

  return projects.map((project) => ({
    ...project,
    members: membersMap[project.id] || [],
  }));
};


// update project service
export const updateProjectService = async (
  projectId: string,
  userId: string,
  data: {
    name?: string;
    description?: string;
    status?: string;
    themeColor?: string;
  }
) => {
  return await db.transaction(async (tx) => {

    // 1. Check membership + role
    const [member] = await tx
      .select({
        role: projectMembers.role,
      })
      .from(projectMembers)
      .where(
        and(
          eq(projectMembers.projectId, projectId),
          eq(projectMembers.userId, userId)
        )
      );

    if (!member) {
      throw new Error("Access denied");
    }

    if (member.role !== "ADMIN") {
      throw new Error("Only admin can update project");
    }

    // 2. Filter allowed fields
    const updateData: any = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.themeColor !== undefined) updateData.themeColor = data.themeColor;

    // ❗ prevent empty update
    if (Object.keys(updateData).length === 0) {
      throw new Error("No valid fields to update");
    }

    // 3. Update project
    const [updatedProject] = await tx
      .update(projects)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, projectId))
      .returning();

    if (!updatedProject) {
      throw new Error("Project not found");
    }

    return updatedProject;
  });
};

// delete a project
export const deleteProjectService = async (
  projectId: string,
  userId: string
) => {
  return await db.transaction(async (tx) => {

    // 1. Check membership + role
    const [member] = await tx
      .select({
        role: projectMembers.role,
      })
      .from(projectMembers)
      .where(
        and(
          eq(projectMembers.projectId, projectId),
          eq(projectMembers.userId, userId)
        )
      );

    if (!member) {
      throw new Error("Access denied");
    }

    if (member.role !== "ADMIN") {
      throw new Error("Only admin can delete project");
    }

    // 2. Delete tasks
    await tx.delete(tasks).where(eq(tasks.projectId, projectId));

    // 3. Delete members
    await tx
      .delete(projectMembers)
      .where(eq(projectMembers.projectId, projectId));

    // 4. Delete project
    const deleted = await tx
      .delete(projects)
      .where(eq(projects.id, projectId))
      .returning();

    if (deleted.length === 0) {
      throw new Error("Project not found");
    }

    return true;
  });
};