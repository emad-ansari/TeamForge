import React, { createContext, useContext, useState } from "react";
import type { Task } from "@/lib/mock-data";

type TaskModalContextType = {
  isCreateTaskOpen: boolean;
  taskToEdit: Task | null;
  openCreateTaskModal: (task?: Task) => void;
  closeCreateTaskModal: () => void;
};

const TaskModalContext = createContext<TaskModalContextType | undefined>(undefined);

export const TaskModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const openCreateTaskModal = (task?: Task) => {
    if (task) setTaskToEdit(task);
    else setTaskToEdit(null);
    setIsCreateTaskOpen(true);
  };
  
  const closeCreateTaskModal = () => {
    setIsCreateTaskOpen(false);
    setTaskToEdit(null);
  };

  return (
    <TaskModalContext.Provider value={{ isCreateTaskOpen, taskToEdit, openCreateTaskModal, closeCreateTaskModal }}>
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
