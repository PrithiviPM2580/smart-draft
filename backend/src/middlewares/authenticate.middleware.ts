import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

import { verifyAccessToken } from '@/lib/jwt.lib';

import { logger } from '@/lib/logger.lib';
import type { NextFunction, Request, Response } from 'express';
import type { Types } from 'mongoose';

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const jwtPayload = verifyAccessToken(token) as { userId: Types.ObjectId };
    req.userId = jwtPayload.userId;
    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res
        .status(401)
        .json({ code: 'TOKEN_EXPIRED', message: 'Token has expired' });
      return;
    } else if (error instanceof JsonWebTokenError) {
      res.status(401).json({ code: 'INVALID_TOKEN', message: 'Invalid token' });
      return;
    }

    logger.error('Authentication error', { error });
    return next(error);
  }
};

export default authenticate;
