import { cookies } from '@/lib/cookies.lib';
import { logger } from '@/lib/logger.lib';
import Token from '@/models/token.model';
import type { NextFunction, Request, Response } from 'express';

const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshToken as string;

    if (refreshToken) {
      await Token.deleteOne({ token: refreshToken });

      logger.info('Refresh token deleted successfully', {
        userId: req.userId,
        token: refreshToken,
      });
    }

    cookies.clear(res, 'refreshToken');

    res.status(200).json({ message: 'Logged out successfully' });
    logger.info('User logged out successfully', { userId: req.userId });
  } catch (error) {
    next(error);
  }
};

export default logout;
