// middlewares/corsMiddleware.ts

import cors, { CorsOptions } from "cors";
import { allowedOrigins } from "../configs/config";

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
