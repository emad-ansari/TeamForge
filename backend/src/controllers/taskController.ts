import {
  createTaskService,
  deleteTaskService,
  getMyTasksService,
  getTasksByProjectService,
  updateTaskService,
} from "@/services/task.service";
import { Response } from "express";
import { AuthRequest } from "@/middlewares/auth";
import { createActivityLog } from "@/services/activity.service";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const currentUserId = req.user!.userId;
    const { projectId } = req.params;
    console.log('projectId: ', projectId);
    console.log('currentUserId: ', currentUserId);

    const task = await createTaskService(
      projectId as string,
      currentUserId,
      req.body,
    );
    
    await createActivityLog({
      action: "TASK_CREATED",
      message: `created task "${task.title}"`,
      userId: currentUserId,
      projectId: projectId as string,
      taskId: task.id,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error: any) {
    console.error("[createTask Error]:", error);
    
    // Check for specific database errors if needed
    if (error.code === "23503") { // Foreign key violation
      return res.status(400).json({ message: "Invalid project or user reference" });
    }

    return res.status(400).json({
      message: error.message || "Failed to create task",
    });
  }
};

export const getTasksByProject = async (req: AuthRequest, res: Response) => {
  try {
    const currentUserId = req.user!.userId;
    const { projectId } = req.params;

    const tasks = await getTasksByProjectService(
      projectId as string,
      currentUserId as string,
    );

    return res.status(200).json({
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// update task
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const currentUserId = req.user!.userId;
    const { projectId, taskId } = req.params;

    const updatedTask = await updateTaskService(
      projectId as string,
      taskId as string,
      currentUserId as string,
      req.body,
    );
    await createActivityLog({
      action: "TASK_UPDATED",
      message: `updated task "${updatedTask.title}"`,
      userId: currentUserId,
      projectId: projectId as string,
      taskId: taskId as string,
    });
    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error: any) {
    console.error("[updateTask Error]:", error);
    return res.status(400).json({
      message: error.message || "Failed to update task",
    });
  }
};

// delete task
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const currentUserId = req.user!.userId;
    const { projectId, taskId } = req.params;

    await deleteTaskService(
      projectId as string,
      taskId as string,
      currentUserId as string,
    );

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// get my task
export const getMyTasks = async (req: AuthRequest, res: Response) => {
  try {
    const currentUserId = req.user!.userId;

    const tasks = await getMyTasksService(currentUserId);

    return res.status(200).json({
      tasks,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
