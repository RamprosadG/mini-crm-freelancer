import { Router } from "express";
import authRouter from "../modules/auth/authRoute";

const router = Router();
router.use("/auth", authRouter);

export default router;
