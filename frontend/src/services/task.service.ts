import api from "../lib/api";
import type { Task, CreateTaskData, UpdateTaskData, TaskResponse } from "../types/task";

export const taskService = {
  getTasksByProject: async (projectId: string): Promise<Task[]> => {
    const response = await api.get<TaskResponse>(`/task/${projectId}/tasks`);
    return response.data.tasks || [];
  },

  createTask: async (projectId: string, data: CreateTaskData): Promise<Task> => {
    const response = await api.post<TaskResponse>(`/task/${projectId}/tasks`, data);
    return response.data.task!;
  },

  updateTask: async (projectId: string, taskId: string, data: UpdateTaskData): Promise<Task> => {
    const response = await api.patch<TaskResponse>(`/task/${projectId}/tasks/${taskId}`, data);
    return response.data.task!;
  },

  deleteTask: async (projectId: string, taskId: string): Promise<void> => {
    await api.delete(`/task/${projectId}/tasks/${taskId}`);
  },

  getMyTasks: async (): Promise<Task[]> => {
    const response = await api.get<TaskResponse>(`/task/me`);
    return response.data.tasks || [];
  },
};
