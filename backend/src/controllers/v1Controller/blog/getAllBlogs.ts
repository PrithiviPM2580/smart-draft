import Blog from '@/models/blog.model';
import type { Request, Response, NextFunction } from 'express';
import { logger } from '@/lib/logger.lib';

const getAllBlogs = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.status(200).json({
      success: true,
      message: 'Blogs retrieved successfully',
      blogs,
    });
    logger.info('Blogs retrieved successfully', {
      message: 'Blogs fetched',
      blogs,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllBlogs;
