import express from "express";
import { authMiddleware } from "@/middlewares/auth";
import { createTask, deleteTask, getMyTasks, getTasksByProject, updateTask } from "@/controllers/taskController";

const router = express.Router();

router.post("/:projectId/tasks", authMiddleware, createTask);
router.get("/:projectId/tasks", authMiddleware, getTasksByProject);
router.patch("/:projectId/tasks/:taskId", authMiddleware, updateTask);
router.delete("/:projectId/tasks/:taskId", authMiddleware, deleteTask);
router.get("/me", authMiddleware, getMyTasks);

export default router;
