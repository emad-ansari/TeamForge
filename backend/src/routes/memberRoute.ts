import express from "express";
import { authMiddleware } from "@/middlewares/auth";
import { getProjectMembers, removeMember, updateMemberRole } from "@/controllers/memberContoller";

const router = express.Router();

router.get("/:projectId/members", authMiddleware, getProjectMembers);
router.delete("/:projectId/members/:memberId", authMiddleware, removeMember);
router.patch("/:projectId/members/:memberId", authMiddleware, updateMemberRole);

export default router;