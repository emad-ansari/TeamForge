import React, { createContext, useContext, useState } from "react";

type TaskModalContextType = {
  isCreateTaskOpen: boolean;
  openCreateTaskModal: () => void;
  closeCreateTaskModal: () => void;
};

const TaskModalContext = createContext<TaskModalContextType | undefined>(undefined);

export const TaskModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  const openCreateTaskModal = () => setIsCreateTaskOpen(true);
  const closeCreateTaskModal = () => setIsCreateTaskOpen(false);

  return (
    <TaskModalContext.Provider value={{ isCreateTaskOpen, openCreateTaskModal, closeCreateTaskModal }}>
      {children}
    </TaskModalContext.Provider>
  );
};

export const useTaskModal = () => {
  const context = useContext(TaskModalContext);
  if (!context) {
    throw new Error("useTaskModal must be used within a TaskModalProvider");
  }
  return context;
};
