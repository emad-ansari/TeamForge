import React, { createContext, useContext, useState } from "react";

type ProjectModalContextType = {
  isOpen: boolean;
  openProjectModal: () => void;
  closeProjectModal: () => void;
};

const ProjectModalContext = createContext<ProjectModalContextType | undefined>(undefined);

export const ProjectModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openProjectModal = () => setIsOpen(true);
  const closeProjectModal = () => setIsOpen(false);

  return (
    <ProjectModalContext.Provider value={{ isOpen, openProjectModal, closeProjectModal }}>
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
