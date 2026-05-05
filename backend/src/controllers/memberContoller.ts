import { AuthRequest } from "@/middlewares/auth";
import { getProjectMembersService, removeMemberService, updateMemberRoleService } from "@/services/member.service";
import { Response } from "express";

export const getProjectMembers = async (req:AuthRequest, res:Response) => {
  try {
    const userId = req.user!.userId;
    const projectId = req.params.projectId as string;

    const members = await getProjectMembersService(projectId, userId);

    return res.status(200).json({
      members,
    });

  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const removeMember = async (req:AuthRequest, res:Response) => {
  try {
    const currentUserId = req.user!.userId;
    const { projectId, memberId } = req.params;

    await removeMemberService(projectId as string, currentUserId, memberId as string);

    return res.status(200).json({
      message: "Member removed successfully",
    });

  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


export const updateMemberRole = async (req:AuthRequest, res:Response) => {
  try {
    const currentUserId = req.user!.userId;
    const { projectId, memberId } = req.params;
    const { role } = req.body;

    const updated = await updateMemberRoleService(
      projectId as string,
      currentUserId,
      memberId as string,
      role as string
    );

    return res.status(200).json({
      message: "Role updated successfully",
      member: updated,
    });

  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};