import { z } from 'zod';
import User from '@/models/user.model';

export const signupSchema = z.object({
  username: z
    .string()
    .min(5, { message: 'Username must be at least 5 characters long' })
    .max(20, { message: 'Username must be at most 20 characters long' })
    .refine(
      async username => {
        const isUserExist = await User.exists({ username });
        return !isUserExist;
      },
      { message: 'Username already taken' }
    ),
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

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password must be at most 20 characters long' }),
});

export type ISignup = z.infer<typeof signupSchema>;
export type ILogin = z.infer<typeof loginSchema>;
