import { z } from 'zod';
import User from '@/models/user.model';

export const signupSchema = z.object({
  email: z.email({ pattern: z.regexes.email }).refine(
    async email => {
      const isUserExist = await User.exists({ email });
      return !isUserExist;
    },
    { message: 'User already exists with this email' }
  ),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password must be at most 20 characters long' }),

  role: z.enum(['user', 'admin']).optional(),
});

export type ISignup = z.infer<typeof signupSchema>;
