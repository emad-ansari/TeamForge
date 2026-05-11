// src/routes/project.routes.ts

import express from "express";
import { createProject, deleteProject, getProjectById, getUserProjects, updateProject } from "@/controllers/projectController";
import { authMiddleware } from "@/middlewares/auth";

const router = express.Router();

router.get("/", authMiddleware, getUserProjects);
router.post("/create", authMiddleware, createProject);
router.get("/:projectId", authMiddleware, getProjectById);
router.delete("/:projectId", authMiddleware, deleteProject);
router.patch("/:projectId", authMiddleware, updateProject);

export default router;