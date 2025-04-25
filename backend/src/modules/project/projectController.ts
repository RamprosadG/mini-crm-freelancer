import { Request, Response } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjectsByUserId,
  updateProject,
} from "./projectService";

export const createProjectController = async (req: Request, res: Response) => {
  try {
    const newProject = await createProject(req?.body);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const updateProjectController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedProject = await updateProject(id, data);

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const deleteProjectController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedProject = await deleteProject(id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: deletedProject,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getProjectsByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const Projects = await getProjectsByUserId(userId);

    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      data: Projects,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getProjectByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Projects = await getProjectById(id);

    res.status(200).json({
      success: true,
      message: "Project retrieved successfully",
      data: Projects,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
