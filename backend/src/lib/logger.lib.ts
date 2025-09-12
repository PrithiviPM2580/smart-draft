import winston from 'winston';
import { config } from '@/config/env';

const { combine, timestamp, errors, json, printf, colorize } = winston.format;

// Create transports array
const transports: winston.transport[] = [];

// File transport for production / persistent logs
transports.push(
  new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  new winston.transports.File({ filename: 'logs/combined.log' })
);

// Console transport for development
if (config.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss A' }),
        printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? `\n${JSON.stringify(meta, null, 2)}`
            : '';
          return `${timestamp} [${level}]: ${message}${metaStr}`;
        })
      ),
    })
  );
}

// Create logger
const logger = winston.createLogger({
  level: config.LOG_LEVEL || 'info',
  format: combine(timestamp(), errors({ stack: true }), json()),
  defaultMeta: { service: 'smart-draft-app' },
  transports,
  silent: config.NODE_ENV === 'test', // mute logs in test environment
});

export { logger };
