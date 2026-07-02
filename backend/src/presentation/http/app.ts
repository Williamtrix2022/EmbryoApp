import cors from "cors";
import express, { Application } from "express";
import { env } from "../../infrastructure/config/env";
import { healthRouter } from "./routes/health.routes";
import { errorHandler } from "./middlewares/error-handler";

export function createApp(): Application {
  const app = express();

  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json());

  app.use(healthRouter);

  app.use(errorHandler);

  return app;
}