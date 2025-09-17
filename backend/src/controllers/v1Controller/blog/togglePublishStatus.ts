import { logger } from '@/lib/logger.lib';
import Blog from '@/models/blog.model';
import type { Request, Response, NextFunction } from 'express';

const togglePublishStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const toggleId = req.params.id;
    const blog = await Blog.findById(toggleId);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.status(200).json({
      message: `Blog ${blog.isPublished ? 'published' : 'unpublished'} successfully`,
      blog,
    });
    logger.info(`Blog with ID ${toggleId} toggled publish status successfully`);
  } catch (error) {
    next(error);
  }
};

export default togglePublishStatus;
