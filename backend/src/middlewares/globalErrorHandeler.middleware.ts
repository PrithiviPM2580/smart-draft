import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/utils/apiError.utils';
import { logger } from '@/lib/logger.lib';

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  void next;
  if (err instanceof ApiError) {
    logger.error('API Error:', {
      message: err.message,
      statusCode: err.statusCode,
      errors: err.errors,
      stack: err.stack,
    });

    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }

  logger.error('Unhandled Error:', { error: err });

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    errors: [],
  });
};
