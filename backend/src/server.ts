import app from '@/app';
import { config } from '@/config/env';
import { logger } from '@/lib/logger.lib';
import { connectToDatabase, disconnectFromDatabase } from '@/config/database';

const PORT = config.PORT || 3001;

const startServer = async () => {
  try {
    await connectToDatabase();

    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });

    const gracefulShutdown = async () => {
      try {
        await disconnectFromDatabase();
        logger.warn('Server shutting down gracefully');
      } catch (err: unknown) {
        if (err instanceof Error) {
          logger.error('Error during shutdown', {
            message: err.message,
            stack: err.stack,
          });
        } else {
          logger.error('Unknown shutdown error', { err });
        }
      } finally {
        server.close(() => process.exit(0));
      }
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error('Failed to start server', {
        message: err.message,
        stack: err.stack,
      });
    } else {
      logger.error('Unknown error during startup', { err });
    }
    process.exit(1);
  }
};

startServer();
