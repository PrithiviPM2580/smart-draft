import { z } from 'zod';
import { URL } from 'url';

export const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  DATABASE_NAME: z.string().default('smart-draft-db'),
  DATABASE_APP: z.string().default('smart-draft-app'),
  DATABASE_URL: z.string().refine(
    val => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: 'Invalid URL' }
  ),
  WHITELIST_ORIGINS: z
    .string()
    .default('http://localhost:5173')
    .transform(val => val.split(',').map(origin => origin.trim())),
});
