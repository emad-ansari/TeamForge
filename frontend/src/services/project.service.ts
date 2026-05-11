import api from "../lib/api";
import type { 
  Project, 
  CreateProjectData, 
  UpdateProjectData, 
  ProjectResponse 
} from "../types/project";

export const projectService = {
  getAllProjects: async (): Promise<Project[]> => {
    const response = await api.get<{ projects: Project[] }>("/projects");
    return response.data.projects;
  },

  getProjectById: async (id: string): Promise<ProjectResponse> => {
    const response = await api.get<ProjectResponse>(`/projects/${id}`);
    return response.data;
  },

  createProject: async (data: CreateProjectData): Promise<ProjectResponse> => {
    const response = await api.post<ProjectResponse>("/projects/create", data);
    return response.data;
  },

  updateProject: async (id: string, data: UpdateProjectData): Promise<ProjectResponse> => {
    const response = await api.patch<ProjectResponse>(`/projects/${id}`, data);
    return response.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};
