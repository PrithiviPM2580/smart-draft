import { z } from 'zod';

export const commentSchema = z.object({
  blogId: z.string().length(24, { message: 'Invalid blog ID' }),
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' }),
  content: z
    .string()
    .min(5, { message: 'Content must be at least 5 characters long' })
    .max(500, { message: 'Content must be at most 500 characters long' }),
  isApproved: z.boolean().optional().default(false),
});

export type IComment = z.infer<typeof commentSchema>;
