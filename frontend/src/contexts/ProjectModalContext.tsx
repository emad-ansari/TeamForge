import React, { createContext, useContext, useState } from "react";
import { type  Project } from "@/lib/mock-data";

type ProjectModalContextType = {
  isOpen: boolean;
  editingProject: Project | null;
  openProjectModal: (project?: Project) => void;
  closeProjectModal: () => void;
};

const ProjectModalContext = createContext<ProjectModalContextType | undefined>(undefined);

export const ProjectModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const openProjectModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
    } else {
      setEditingProject(null);
    }
    setIsOpen(true);
  };

  const closeProjectModal = () => {
    setIsOpen(false);
    setEditingProject(null);
  };

  return (
    <ProjectModalContext.Provider value={{ isOpen, editingProject, openProjectModal, closeProjectModal }}>
      {children}
    </ProjectModalContext.Provider>
  );
};

export const useProjectModal = () => {
  const context = useContext(ProjectModalContext);
  if (!context) {
    throw new Error("useProjectModal must be used within a ProjectModalProvider");
  }
  return context;
};
