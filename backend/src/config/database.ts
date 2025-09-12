import mongoose from 'mongoose';
import { config } from '@/config/env';
import { logger } from '@/lib/logger.lib';
import type { ConnectOptions } from 'mongoose';

const clientOptions: ConnectOptions = {
  dbName: 'smart-draft-db',
  appName: 'smart-draft-app',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

let isConnected = false;

export const connectToDatabase = async (): Promise<void> => {
  if (!config.DATABASE_URL) {
    logger.error('DATABASE_URL is not defined in environment variables');
    process.exit(1);
  }

  if (isConnected) return;

  try {
    await mongoose.connect(config.DATABASE_URL, clientOptions);
    isConnected = true;
    logger.info('Connected to database successfully');
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error('Error connecting to database:', {
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
    logger.error('Unknown database connection error:', { error });
    throw new Error('Unknown database connection error');
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  if (!isConnected) return;
  try {
    await mongoose.disconnect();
    isConnected = false;
    logger.info('Disconnected from database successfully');
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error('Error disconnecting from database:', {
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
    logger.error('Unknown database disconnection error:', { error });
    throw new Error('Unknown database disconnection error');
  }
};

process.on('SIGINT', disconnectFromDatabase);
process.on('SIGTERM', disconnectFromDatabase);
