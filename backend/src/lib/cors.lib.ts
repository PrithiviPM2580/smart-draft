import type { CorsOptions } from 'cors';
import { config } from '@/config/env';
import { logger } from './logger.lib';

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      return callback(null, true);
    } else {
      callback(
        new Error(`Cors policy does not allow access from ${origin}`),
        false
      );
      logger.warn(`Blocked CORS request from origin: ${origin}`);
    }
  },
};

export default corsOptions;
