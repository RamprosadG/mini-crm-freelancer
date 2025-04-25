import { Router } from "express";
import {
  createReminderController,
  updateReminderController,
  deleteReminderController,
} from "./reminderController";
import validateSchema from "../../middlewares/validateSchema";
import { createReminderSchema, updateReminderSchema } from "./reminderSchema";

const reminderRouter = Router();

reminderRouter.post(
  "/create",
  validateSchema(createReminderSchema),
  createReminderController
);
reminderRouter.put(
  "/update/:id",
  validateSchema(updateReminderSchema),
  updateReminderController
);
reminderRouter.delete("/delete/:id", deleteReminderController);

export default reminderRouter;
