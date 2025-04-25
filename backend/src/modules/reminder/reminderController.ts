import { Request, Response } from "express";
import {
  createReminder,
  deleteReminder,
  updateReminder,
} from "./reminderService";

export const createReminderController = async (req: Request, res: Response) => {
  try {
    const newReminder = await createReminder(req?.body);

    res.status(201).json({
      success: true,
      message: "Reminder created successfully",
      data: newReminder,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const updateReminderController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedReminder = await updateReminder(id, data);

    res.status(200).json({
      success: true,
      message: "Reminder updated successfully",
      data: updatedReminder,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const deleteReminderController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedReminder = await deleteReminder(id);

    res.status(200).json({
      success: true,
      message: "Reminder deleted successfully",
      data: deletedReminder,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
