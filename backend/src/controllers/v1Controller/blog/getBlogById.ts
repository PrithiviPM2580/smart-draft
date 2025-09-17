import { logger } from '@/lib/logger.lib';
import Blog from '@/models/blog.model';
import type { Request, Response, NextFunction } from 'express';

const getBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId).lean().exec();
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Blog retrieved successfully',
      blog,
    });
    logger.info(`Blog with ID: ${blogId} retrieved successfully`, { blog });
  } catch (error) {
    next(error);
  }
};

export default getBlogById;
