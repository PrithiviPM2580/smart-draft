import { blogSchema } from '@/validation/blog.schema';
import type { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { logger } from '@/lib/logger.lib';
import { uploadImage, imageUrl } from '@/config/imagekit';
import Blog from '@/models/blog.model';
import { ApiError } from '@/utils/apiError.utils';

const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate only text fields first
    const parsed = await blogSchema.parseAsync(req.body);
    const { title, subTitle, description, category, isPublished } = parsed;

    if (!req.file) {
      return next(new ApiError(400, 'No image file uploaded'));
    }

    // Read and upload image
    const imageBuffer = fs.readFileSync(req.file.path);
    const response = await uploadImage(imageBuffer, req.file.originalname);
    fs.unlinkSync(req.file.path); // clean up local file

    if (!response) {
      return next(new ApiError(500, 'Image upload failed'));
    }

    const image = imageUrl(response);

    // Save blog
    const newBlog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog: newBlog,
    });

    logger.info('Blog created successfully', {
      blogId: newBlog._id,
      title: newBlog.title,
      category: newBlog.category,
      isPublished: newBlog.isPublished,
    });
  } catch (error) {
    next(error);
  }
};

export default createBlog;
