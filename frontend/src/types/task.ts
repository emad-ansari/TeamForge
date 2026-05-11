export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  projectId: string;
  assigneeId: string;
  dueDate: string;
  label: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  assignee?: {
    id: string;
    name: string;
    avatar: string | null;
  };
}

export interface CreateTaskData {
  title: string;
  description?: string;
  assigneeId: string;
  dueDate: string;
  label: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
  assigneeId?: string;
  dueDate?: string;
  label?: string;
}

export interface TaskResponse {
  message: string;
  task?: Task;
  tasks?: Task[];
}
