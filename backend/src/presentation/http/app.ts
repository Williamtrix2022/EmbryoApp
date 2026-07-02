import cors from 'cors';
import express, { Application } from 'express';
import { env } from '../../infrastructure/config/env';
import { errorHandler } from './middlewares/error-handler';
import { healthRouter } from './routes/health.routes';
import { authRouter } from './routes/auth.routes';

export function createApp(): Application {
  const app = express();

  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json());

  app.use(healthRouter);
  app.use('/api', authRouter);

  app.use(errorHandler);

  return app;
}
