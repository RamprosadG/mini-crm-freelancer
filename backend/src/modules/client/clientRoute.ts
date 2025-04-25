import { Router } from "express";
import {
  createClientController,
  updateClientController,
  deleteClientController,
  getClientsByUserIdController,
  getClientByIdController,
} from "./clientController";
import validateSchema from "../../middlewares/validateSchema";
import { createClientSchema, updateClientSchema } from "./clientSchema";

const clientRouter = Router();

clientRouter.post(
  "/create",
  validateSchema(createClientSchema),
  createClientController
);

clientRouter.put(
  "/update/:id",
  validateSchema(updateClientSchema),
  updateClientController
);

clientRouter.delete("/delete/:id", deleteClientController);
clientRouter.get("/get/user/:userId", getClientsByUserIdController);
clientRouter.get("/get/one/:id", getClientByIdController);

export default clientRouter;
