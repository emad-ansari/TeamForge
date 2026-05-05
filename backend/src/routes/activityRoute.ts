import { authMiddleware } from "@/middlewares/auth";
import express from "express";
import { getActivityLogs } from "@/controllers/activityController";

const router = express.Router();

router.get("/:projectId/activity",authMiddleware,getActivityLogs);

export default router;