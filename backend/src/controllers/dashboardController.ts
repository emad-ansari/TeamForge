import { getDashboardStatsService } from "@/services/dashboard.service";
import { AuthRequest } from "@/middlewares/auth";
import { Response } from "express";

export const getDashboardStats = async (req:AuthRequest, res:Response) => {
  try {
    const userId = req.user!.userId;

    const stats = await getDashboardStatsService(userId);

    return res.json(stats);

  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};