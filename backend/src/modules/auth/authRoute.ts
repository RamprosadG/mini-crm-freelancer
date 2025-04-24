// src/routes/auth.routes.ts

import { Router } from "express";
import { handleLogin, handleRegister } from "./authController";

const authRouter = Router();

authRouter.post("/register", handleRegister);
authRouter.post("/login", handleLogin);

export default authRouter;
