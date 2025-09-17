import { logger } from '@/lib/logger.lib';
import Blog from '@/models/blog.model';
import type { NextFunction, Request, Response } from 'express';

const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blogId = req.params.id;

    const deleteBlog = await Blog.findByIdAndDelete(blogId);

    if (!deleteBlog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
    logger.info(`Blog with ID ${blogId} deleted successfully`);
  } catch (error) {
    next(error);
  }
};

export default deleteBlog;
