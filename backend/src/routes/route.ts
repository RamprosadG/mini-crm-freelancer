import { Router } from "express";
import authRouter from "../modules/auth/authRoute";
import clientRouter from "../modules/client/clientRoute";
import projectRouter from "../modules/project/projectRoute";
import logRouter from "../modules/log/logRoute";
import reminderRouter from "../modules/reminder/reminderRoute";

const router = Router();

router.use("/auth", authRouter);
router.use("/client", clientRouter);
router.use("/project", projectRouter);
router.use("/log", logRouter);
router.use("/reminder", reminderRouter);

export default router;
