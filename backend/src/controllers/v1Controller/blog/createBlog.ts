import { blogSchema } from '@/validation/blog.schema';
import type { IBlog } from '@/models/blog.model';
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
    const parsed: IBlog = await blogSchema.parseAsync(req.body);
    const { title, subTitle, description, category, isPublished } = parsed;

    if (!req.file) {
      return next(new ApiError(400, 'No file uploaded'));
    }

    const imagefile = req.file;

    const imageBuffer = fs.readFileSync(imagefile.path);
    const response = await uploadImage(imageBuffer, imagefile.originalname);
    const optimizedImage = imageUrl(response);

    const image = optimizedImage;

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
