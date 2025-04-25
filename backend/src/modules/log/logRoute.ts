import { Router } from "express";
import {
  createLogController,
  updateLogController,
  deleteLogController,
} from "./logController";
import validateSchema from "../../middlewares/validateSchema";
import { createLogSchema, updateLogSchema } from "./logSchema";

const logRouter = Router();

logRouter.post("/create", validateSchema(createLogSchema), createLogController);
logRouter.put(
  "/update/:id",
  validateSchema(updateLogSchema),
  updateLogController
);
logRouter.delete("/delete/:id", deleteLogController);

export default logRouter;
