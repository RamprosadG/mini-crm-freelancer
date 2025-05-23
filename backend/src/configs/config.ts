import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "";
export const allowedOrigins: string[] =
  process.env.ALLOWED_ORIGINS?.split(",") || [];
