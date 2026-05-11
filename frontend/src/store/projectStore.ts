import { create } from "zustand";
import { projectService } from "../services/project.service";
import type { 
  Project, 
  CreateProjectData, 
  UpdateProjectData 
} from "../types/project";

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;

  fetchProjects: () => Promise<void>;
  fetchProjectById: (id: string) => Promise<void>;
  createProject: (data: CreateProjectData) => Promise<void>;
  updateProject: (id: string, data: UpdateProjectData) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setCurrentProject: (project: Project | null) => void;
  clearError: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const projects = await projectService.getAllProjects();
      set({ projects, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch projects", 
        isLoading: false 
      });
    }
  },

  fetchProjectById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await projectService.getProjectById(id);
      if (response.project) {
        set({ currentProject: response.project, isLoading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch project", 
        isLoading: false 
      });
    }
  },

  createProject: async (data: CreateProjectData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await projectService.createProject(data);
      if (response.project) {
        set((state) => ({ 
          projects: [...state.projects, response.project!],
          isLoading: false 
        }));
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to create project", 
        isLoading: false 
      });
      throw error;
    }
  },

  updateProject: async (id: string, data: UpdateProjectData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await projectService.updateProject(id, data);
      if (response.project) {
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? response.project! : p)),
          currentProject: state.currentProject?.id === id ? response.project! : state.currentProject,
          isLoading: false,
        }));
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to update project", 
        isLoading: false 
      });
      throw error;
    }
  },

  deleteProject: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await projectService.deleteProject(id);
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject,
        isLoading: false,
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to delete project", 
        isLoading: false 
      });
      throw error;
    }
  },

  setCurrentProject: (project) => set({ currentProject: project }),
  clearError: () => set({ error: null }),
}));
