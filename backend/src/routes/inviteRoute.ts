import express from "express";
import { authMiddleware } from "@/middlewares/auth";
import { acceptInvite, inviteMember } from "@/controllers/inviteController";

const router = express.Router();

router.post("/accept", authMiddleware, acceptInvite);
router.post("/:projectId", authMiddleware, inviteMember);

export default router;
