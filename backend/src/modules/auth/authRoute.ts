// src/routes/auth.routes.ts

import { Router } from "express";
import { handleLogin, handleRegister } from "./authController";
import validateSchema from "../../middlewares/validateSchema";
import { loginSchema, registerSchema } from "./authSchema";

const authRouter = Router();

authRouter.post("/register", validateSchema(registerSchema), handleRegister);
authRouter.post("/login", validateSchema(loginSchema), handleLogin);

export default authRouter;
