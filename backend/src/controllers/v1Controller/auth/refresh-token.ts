import { generateAccessToken } from '@/lib/jwt.lib';
import Token from '@/models/token.model';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import type { Types } from 'mongoose';
import { verifyRefreshToken } from '@/lib/jwt.lib';

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies?.refreshToken as string;

  try {
    const tokenExists = await Token.exists({ token: refreshToken });
    if (!tokenExists) {
      res.status(401).json({ code: 'INVALID_TOKEN', message: 'Invalid token' });
      return;
    }

    const jwtPayload = verifyRefreshToken(refreshToken) as {
      userId: Types.ObjectId;
    };

    const accessToken = await generateAccessToken(jwtPayload.userId);

    res.status(200).json({ accessToken });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        code: 'AuthenticationError',
        message: 'Refresh token expired, please login again',
      });
      return;
    }

    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        code: 'AuthenticationError',
        message: 'Refresh token is not valid',
      });
      return;
    }
    next(error);
  }
};

export default refreshToken;
