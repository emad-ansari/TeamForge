// src/services/task.service.ts

import { db } from "@/db/connection";
import { tasks, projectMembers, users, projects } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const createTaskService = async (
  projectId: string,
  currentUserId: string,
  data: {
    title: string;
    description?: string;
    assigneeId: string;
    dueDate: string;
    label: string;
  },
) => {
  // 1. Check current user is member
  console.log("control reaches in create task service")
  const [currentUser] = await db
    .select()
    .from(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, currentUserId),
      ),
    );

  if (!currentUser) {
    throw new Error("Access denied");
  }

  // 2. Check assignee is member
  const [assignee] = await db
    .select()
    .from(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, data.assigneeId),
      ),
    );

  if (!assignee) {
    throw new Error("Assignee is not part of this project");
  }

  // 3. Validate title
  if (!data.title) {
    throw new Error("Title is required");
  }

  // 4. Create task
  const [task] = await db
    .insert(tasks)
    .values({
      title: data.title,
      description: data.description || "",
      projectId,
      assigneeId: data.assigneeId,
      dueDate: new Date(data.dueDate),
      label: data.label,
      status: "todo",
      createdBy: currentUserId,
    })
    .returning();

  // 5. Return with assignee info
  const [result] = await db
    .select({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      status: tasks.status,
      dueDate: tasks.dueDate,
      label: tasks.label,
      assigneeId: tasks.assigneeId,
      projectId: tasks.projectId,
      createdBy: tasks.createdBy,
      createdAt: tasks.createdAt,
      updatedAt: tasks.updatedAt,
      assignee: {
        id: users.id,
        name: users.name,
        avatar: users.avatar,
      },
    })
    .from(tasks)
    .innerJoin(users, eq(tasks.assigneeId, users.id))
    .where(eq(tasks.id, task.id));

  return result;
};

export const getTasksByProjectService = async (
  projectId: string,
  currentUserId: string,
) => {
  // 1. Check user is project member
  const [member] = await db
    .select()
    .from(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, currentUserId),
      ),
    );

  if (!member) {
    throw new Error("Access denied");
  }

  // 2. Fetch tasks with assignee info
  const result = await db
    .select({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      status: tasks.status,
      dueDate: tasks.dueDate,
      label: tasks.label,
      assigneeId: tasks.assigneeId,

      assignee: {
        id: users.id,
        name: users.name,
        avatar: users.avatar,
      },
    })
    .from(tasks)
    .leftJoin(users, eq(tasks.assigneeId, users.id))
    .where(eq(tasks.projectId, projectId));

  return result;
};

// update task
export const updateTaskService = async (
  projectId: string,
  taskId: string,
  currentUserId: string,
  data: any
) => {

  // 1. Check user is project member
  const [member] = await db
    .select()
    .from(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, currentUserId)
      )
    );

  if (!member) {
    throw new Error("Access denied");
  }

  // 2. Check task exists & belongs to project
  const [task] = await db
    .select()
    .from(tasks)
    .where(
      and(
        eq(tasks.id, taskId),
        eq(tasks.projectId, projectId)
      )
    );

  if (!task) {
    throw new Error("Task not found");
  }

  // 3. Validate status
  if (data.status) {
    const allowed = ["todo", "in-progress", "done"];
    if (!allowed.includes(data.status)) {
      throw new Error("Invalid status");
    }
  }

  // 4. Validate assignee
  if (data.assigneeId) {
    const [assignee] = await db
      .select()
      .from(projectMembers)
      .where(
        and(
          eq(projectMembers.projectId, projectId),
          eq(projectMembers.userId, data.assigneeId)
        )
      );

    if (!assignee) {
      throw new Error("Assignee is not in project");
    }
  }

  // 5. Prepare update object
  const updateData: any = {
    ...data,
    updatedAt: new Date(),
  };

  if (data.dueDate) {
    updateData.dueDate = new Date(data.dueDate);
  }

  // 6. Update task
  const [updatedTask] = await db
    .update(tasks)
    .set(updateData)
    .where(eq(tasks.id, taskId))
    .returning();

  // 7. Return with assignee info
  const [result] = await db
    .select({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      status: tasks.status,
      dueDate: tasks.dueDate,
      label: tasks.label,
      assigneeId: tasks.assigneeId,
      projectId: tasks.projectId,
      createdBy: tasks.createdBy,
      createdAt: tasks.createdAt,
      updatedAt: tasks.updatedAt,
      assignee: {
        id: users.id,
        name: users.name,
        avatar: users.avatar,
      },
    })
    .from(tasks)
    .innerJoin(users, eq(tasks.assigneeId, users.id))
    .where(eq(tasks.id, updatedTask.id));

  return result;
};

// delete task
export const deleteTaskService = async (
  projectId: string,
  taskId: string,
  currentUserId: string
) => {

  // 1. Check user is project member
  const [member] = await db
    .select()
    .from(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, currentUserId)
      )
    );

  if (!member) {
    throw new Error("Access denied");
  }

  // 2. Check task exists
  const [task] = await db
    .select()
    .from(tasks)
    .where(
      and(
        eq(tasks.id, taskId),
        eq(tasks.projectId, projectId)
      )
    );

  if (!task) {
    throw new Error("Task not found");
  }

  // 3. Delete task
  await db
    .delete(tasks)
    .where(eq(tasks.id, taskId));

  return true;
};

// get my task service
export const getMyTasksService = async (currentUserId: string) => {

  const result = await db
    .select({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      status: tasks.status,
      dueDate: tasks.dueDate,
      label: tasks.label,
      project: {
        id: projects.id,
        name: projects.name,
      },
      assignee: {
        id: users.id,
        name: users.name,
        avatar: users.avatar,
      },
    })
    .from(tasks)
    .leftJoin(projects, eq(tasks.projectId, projects.id))
    .innerJoin(users, eq(tasks.assigneeId, users.id))
    .where(eq(tasks.assigneeId, currentUserId));

  return result;
};