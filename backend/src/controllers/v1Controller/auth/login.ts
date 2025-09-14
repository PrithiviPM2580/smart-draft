import type { NextFunction, Request, Response } from 'express';
import type { ILogin } from '@/validation/auth.schema';
import { loginSchema } from '@/validation/auth.schema';
import { logger } from '@/lib/logger.lib';
import User from '@/models/user.model';
import { ApiError } from '@/utils/apiError.utils';
import { generateAccessToken } from '@/lib/jwt.lib';
import Token from '@/models/token.model';
import { cookies } from '@/lib/cookies.lib';

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const parsed: ILogin = await loginSchema.parseAsync(req.body);
  const { email } = parsed;

  try {
    const user = await User.findOne({ email }).lean().exec();

    if (!user) {
      return next(
        new ApiError(401, 'Invalid email or password', [
          { field: 'email', message: 'User not found' },
        ])
      );
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateAccessToken(user._id);

    await Token.create({
      token: refreshToken,
      user: user._id,
    });

    cookies.set(res, 'refreshToken', refreshToken);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        id: user._id,
      },
      token: {
        accessToken,
      },
    });

    logger.info('User logged in successfully', {
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    logger.error('Error during user signup', { error });
    next(error);
  }
};

export default login;
