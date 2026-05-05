import { AuthRequest } from "@/middlewares/auth";
import { createProjectService, deleteProjectService, getProjectByIdService, getUserProjectsWithDetails, updateProjectService } from "@/services/project.service";
import { Response } from "express";

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { name, description, themeColor } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Project name and description are required" });
    }

    const project = await createProjectService(
      userId,
      name,
      description,
      themeColor,
    );

    return res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getProjectById = async (req:AuthRequest, res:Response) => {
  try {
    const userId = req.user!.userId;
    const projectId = req.params.projectId as string;

    const data = await getProjectByIdService(projectId, userId);

    return res.status(200).json({
      message: "Project fetched successfully",
      ...data,
    });

  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


export const getUserProjects = async (req:AuthRequest, res:Response) => {
  try {
    const userId = req.user!.userId;

    const projects = await getUserProjectsWithDetails(userId);

    return res.status(200).json({
      projects,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// update project
export const updateProject = async (req:AuthRequest, res:Response) => {
  try {
    const userId = req.user!.userId;
    const projectId = req.params.projectId as string;

    const updatedProject = await updateProjectService(
      projectId,
      userId,
      req.body
    );

    return res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });

  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// delete project
export const deleteProject = async (req:AuthRequest, res:Response) => {
  try {
    const userId = req.user!.userId;
    const projectId = req.params.projectId as string;

    await deleteProjectService(projectId, userId);

    return res.status(200).json({
      message: "Project deleted successfully",
    });

  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};