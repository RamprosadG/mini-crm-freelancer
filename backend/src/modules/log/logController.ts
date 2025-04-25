import { Request, Response } from "express";
import {
  createLog,
  deleteLog,
  updateLog,
} from "./logService";

export const createLogController = async (req: Request, res: Response) => {
  try {
    const newLog = await createLog(req?.body);

    res.status(201).json({
      success: true,
      message: "Log created successfully",
      data: newLog,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const updateLogController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedLog = await updateLog(id, data);

    res.status(200).json({
      success: true,
      message: "Log updated successfully",
      data: updatedLog,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const deleteLogController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedLog = await deleteLog(id);

    res.status(200).json({
      success: true,
      message: "Log deleted successfully",
      data: deletedLog,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
