import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { env } from './config/env.js';
import { routes } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

/**
 * Express application factory.
 *
 * Middleware order matters:
 *   1. helmet        — security headers first
 *   2. cors          — reject disallowed origins before touching the body
 *   3. json parser   — bounded request size
 *   4. routes        — application surface
 *   5. notFound      — any unmatched path becomes a JSON 404
 *   6. errorHandler  — terminal, must be last
 */
export function createApp(): Express {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());

  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
      methods: ['GET', 'POST', 'OPTIONS'],
      credentials: false,
    }),
  );

  app.use(express.json({ limit: '10kb' }));

  app.use('/api', routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
