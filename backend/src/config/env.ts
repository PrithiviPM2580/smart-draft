import dotenv from 'dotenv';
import { envSchema } from '@/validation/env.schema';

dotenv.config();

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = parsed.data;
