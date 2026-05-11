export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived' | 'completed';
  themeColor: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  role?: string;
  totalTasks?: number;
  completedTasks?: number;
  progress?: number;
  members?: { name: string; avatar: string | null }[];
}

export interface CreateProjectData {
  name: string;
  description: string;
  themeColor?: string;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  status?: 'active' | 'archived' | 'completed';
  themeColor?: string;
}

export interface ProjectResponse {
  message: string;
  project?: Project;
  projects?: Project[];
}

export interface ProjectWithDetails extends Project {
  memberCount: number;
  taskCount: number;
}
