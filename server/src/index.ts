import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
});

const shutdown = (signal: NodeJS.Signals): void => {
  // eslint-disable-next-line no-console
  console.log(`[server] received ${signal}, shutting down gracefully`);
  server.close((err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('[server] error during shutdown', err);
      process.exit(1);
    }
    process.exit(0);
  });

  // Force exit if connections keep the server open beyond 10s.
  setTimeout(() => process.exit(1), 10_000).unref();
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

process.on('unhandledRejection', (reason) => {
  // eslint-disable-next-line no-console
  console.error('[server] unhandled rejection', reason);
});

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.error('[server] uncaught exception', err);
  process.exit(1);
});

export { server };
