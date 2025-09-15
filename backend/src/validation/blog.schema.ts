import { z } from 'zod';

export const blogSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long' })
    .max(100, { message: 'Title must be at most 100 characters long' }),
  subTitle: z
    .string()
    .min(5, { message: 'Subtitle must be at least 5 characters long' })
    .max(100, { message: 'Subtitle must be at most 100 characters long' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .max(500, { message: 'Description must be at most 500 characters long' }),
  category: z
    .string()
    .min(3, { message: 'Category must be at least 3 characters long' })
    .max(50, { message: 'Category must be at most 50 characters long' }),
  image: z.url({ message: 'Invalid image URL' }).optional(),
  isPublished: z.boolean().optional().default(false),
});

export type IBlog = z.infer<typeof blogSchema>;
