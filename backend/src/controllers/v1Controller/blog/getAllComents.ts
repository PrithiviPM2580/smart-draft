import Comment from '@/models/comment.model';
import type { NextFunction, Request, Response } from 'express';

const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Comments retrieved successfully',
      comments,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllComments;
