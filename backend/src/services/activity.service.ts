import { db } from "@/db/connection";
import { activityLogs, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";


export const createActivityLog = async ({
  action,
  message,
  userId,
  projectId,
  taskId,
}: {
  action: string;
  message: string;
  userId: string;
  projectId?: string;
  taskId?: string;
}) => {
  await db.insert(activityLogs).values({
    action,
    message,
    userId,
    projectId,
    taskId,
  });
};

export const getActivityLogsService = async (projectId: string) => {
  return await db
    .select({
      id: activityLogs.id,
      message: activityLogs.message,
      createdAt: activityLogs.createdAt,
      user: {
        id: users.id,
        name: users.name,
        avatar: users.avatar,
      },
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.projectId, projectId))
    .orderBy(desc(activityLogs.createdAt))
    .limit(20);
};