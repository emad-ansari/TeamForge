import { Response } from "express";
import { acceptInviteService, inviteMemberService } from "@/services/invite.service";
import { AuthRequest } from "@/middlewares/auth";
import { createActivityLog } from "@/services/activity.service";

export const inviteMember = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { projectId } = req.params;
    const { email } = req.body;

    const invite = await inviteMemberService(projectId as string, userId, email);

    return res.status(200).json({
      message: "Invite sent",
      invite,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const acceptInvite = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    console.log("current userId: ", userId);

    const { token } = req.body;
    const result = await acceptInviteService(token, userId);

    await createActivityLog({
      action: "MEMBER_JOINED",
      message: `joined project "${result.projectId}"`,
      userId: userId,
      projectId: result.projectId,
    });

    return res.status(200).json({
      message: "Joined project successfully",
      projectId: result.projectId,
    });

  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
