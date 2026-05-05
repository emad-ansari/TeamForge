import { AuthRequest } from "@/middlewares/auth";
import { getActivityLogsService } from "@/services/activity.service";
import { Response } from "express";

export const getActivityLogs = async (req:AuthRequest, res:Response) => {
  try {
    const { projectId } = req.params;

    const logs = await getActivityLogsService(projectId as string);

    res.json({ logs });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};