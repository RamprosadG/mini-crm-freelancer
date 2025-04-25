import { Router } from "express";
import {
  createProjectController,
  updateProjectController,
  deleteProjectController,
  getProjectsByUserIdController,
  getProjectByIdController,
} from "./projectController";
import { createProjectSchema, updateProjectSchema } from "./projectSchema";
import validateSchema from "../../middlewares/validateSchema";

const projectRouter = Router();

projectRouter.post(
  "/create",
  validateSchema(createProjectSchema),
  createProjectController
);
projectRouter.put(
  "/update/:id",
  validateSchema(updateProjectSchema),
  updateProjectController
);
projectRouter.delete("/delete/:id", deleteProjectController);
projectRouter.get("/get/user/:userId", getProjectsByUserIdController);
projectRouter.get("/get/one/:id", getProjectByIdController);

export default projectRouter;
