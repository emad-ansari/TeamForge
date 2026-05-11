import { create } from "zustand";
import { taskService } from "../services/task.service";
import type { Task, CreateTaskData, UpdateTaskData, TaskStatus } from "../types/task";

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;

  fetchTasks: (projectId: string) => Promise<void>;
  createTask: (projectId: string, data: CreateTaskData) => Promise<void>;
  updateTask: (projectId: string, taskId: string, data: UpdateTaskData) => Promise<void>;
  updateTaskStatus: (projectId: string, taskId: string, status: TaskStatus) => Promise<void>;
  deleteTask: (projectId: string, taskId: string) => Promise<void>;
  fetchMyTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await taskService.getTasksByProject(projectId);
      set({ tasks, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch tasks", 
        isLoading: false 
      });
    }
  },

  createTask: async (projectId, data) => {
    try {
      const newTask = await taskService.createTask(projectId, data);
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to create task" });
      throw error;
    }
  },

  updateTask: async (projectId, taskId, data) => {
    try {
      const updatedTask = await taskService.updateTask(projectId, taskId, data);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to update task" });
      throw error;
    }
  },

  updateTaskStatus: async (projectId, taskId, status) => {
    // Optimistic update
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
    }));

    try {
      await taskService.updateTask(projectId, taskId, { status });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to update status" });
      // Re-fetch tasks to ensure UI is in sync with server state
      const tasks = await taskService.getTasksByProject(projectId);
      set({ tasks });
    }
  },

  deleteTask: async (projectId, taskId) => {
    try {
      await taskService.deleteTask(projectId, taskId);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== taskId),
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to delete task" });
      throw error;
    }
  },

  fetchMyTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await taskService.getMyTasks();
      set({ tasks, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch your tasks", 
        isLoading: false 
      });
    }
  },
}));
