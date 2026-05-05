import { db } from "@/db/connection";
import { tasks, projectMembers, projects } from "@/db/schema";
import { eq, desc, inArray, and, gte, sql } from "drizzle-orm";

/* ---------------------------------- */
/* 1. DASHBOARD STATS */
/* ---------------------------------- */
export const getDashboardStatsService = async (userId: string) => {
  // get projectIds
  const memberships = await db
    .select({ projectId: projectMembers.projectId })
    .from(projectMembers)
    .where(eq(projectMembers.userId, userId));

  const projectIds = memberships.map((m) => m.projectId);

  if (projectIds.length === 0) {
    return { total: 0, completed: 0, inProgress: 0, overdue: 0 };
  }

  const now = new Date();

  // optimized aggregation using SQL
  const [result] = await db
    .select({
      total: sql<number>`count(*)`,
      completed: sql<number>`count(*) filter (where status = 'done')`,
      inProgress: sql<number>`count(*) filter (where status = 'in-progress')`,
      overdue: sql<number>`count(*) filter (
        where status != 'done' and due_date < ${now}
      )`,
    })
    .from(tasks)
    .where(inArray(tasks.projectId, projectIds));

  return result;
};

/* ---------------------------------- */
/* 2. RECENT TASKS */
/* ---------------------------------- */
export const getRecentTasksService = async (userId: string) => {
  return await db
    .select({
      id: tasks.id,
      title: tasks.title,
      status: tasks.status,
      dueDate: tasks.dueDate,
    })
    .from(tasks)
    .where(eq(tasks.assigneeId, userId))
    .orderBy(desc(tasks.createdAt))
    .limit(5);
};

/* ---------------------------------- */
/* 3. TASK VELOCITY (LAST 7 DAYS) */
/* ---------------------------------- */
export const getTaskVelocityService = async (userId: string) => {
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const completedTasks = await db
    .select({
      updatedAt: tasks.updatedAt,
    })
    .from(tasks)
    .where(
      and(
        eq(tasks.assigneeId, userId),
        eq(tasks.status, "done"),
        gte(tasks.updatedAt, last7Days)
      )
    );

  const result = Array(7).fill(0);

  completedTasks.forEach((task) => {
    const dayIndex = Math.floor(
      (Date.now() - new Date(task.updatedAt).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (dayIndex < 7) {
      result[6 - dayIndex]++;
    }
  });

  return result;
};

/* ---------------------------------- */
/* 4. ACTIVE PROJECTS */
/* ---------------------------------- */
export const getActiveProjectsService = async (userId: string) => {
  const memberships = await db
    .select({ projectId: projectMembers.projectId })
    .from(projectMembers)
    .where(eq(projectMembers.userId, userId));

  const projectIds = memberships.map((m) => m.projectId);

  if (projectIds.length === 0) return [];

  // join + aggregation (no loop queries)
  const result = await db
    .select({
      id: projects.id,
      name: projects.name,
      total: sql<number>`count(${tasks.id})`,
      completed: sql<number>`count(${tasks.id}) filter (where ${tasks.status} = 'done')`,
    })
    .from(projects)
    .leftJoin(tasks, eq(tasks.projectId, projects.id))
    .where(inArray(projects.id, projectIds))
    .groupBy(projects.id);

  return result.map((p) => ({
    id: p.id,
    name: p.name,
    progress:
      p.total === 0 ? 0 : Math.round((p.completed / p.total) * 100),
  }));
};

/* ---------------------------------- */
/* 5. FINAL COMBINED SERVICE */
/* ---------------------------------- */
export const getDashboardDataService = async (userId: string) => {
  const [stats, recentTasks, taskVelocity, activeProjects] =
    await Promise.all([
      getDashboardStatsService(userId),
      getRecentTasksService(userId),
      getTaskVelocityService(userId),
      getActiveProjectsService(userId),
    ]);

  return {
    stats,
    recentTasks,
    taskVelocity,
    activeProjects,
  };
};