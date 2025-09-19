import Comment from '@/models/comment.model';
import { commentSchema } from '@/validation/comment.schema';
import type { NextFunction, Request, Response } from 'express';

const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = await commentSchema.parseAsync(req.body);
    const { blogId, name, content } = parsed;

    const newComment = await Comment.create({
      blogId,
      name,
      content,
    });

    res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment,
    });
  } catch (error) {
    next(error);
  }
};

export default addComment;
