import type { NextFunction, Request, Response } from 'express';
import type { ISignup } from '@/validation/auth.schema';
import { signupSchema } from '@/validation/auth.schema';
import { config } from '@/config/env';
import { logger } from '@/lib/logger.lib';
import { getUsername } from '@/utils/getUsername.utils';
import User from '@/models/user.model';
import { ApiError } from '@/utils/apiError.utils';
import { generateAccessToken } from '@/lib/jwt.lib';
import Token from '@/models/token.model';
import { cookies } from '@/lib/cookies.lib';

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const parsed: ISignup = await signupSchema.parseAsync(req.body);
  const { email, password, role } = parsed;

  if (role === 'admin' && !config.WHITELIST_ADMINS_MAIL?.includes(email)) {
    logger.warn(`Unauthorized admin signup attempt with email: ${email}`);

    return next(
      new ApiError(403, 'You are not authorized to sign up as admin', [
        { field: 'role', message: 'Unauthorized admin signup attempt' },
      ])
    );
  }
  try {
    const username = getUsername();
    const newUser = await User.create({
      username,
      email,
      password,
      role,
    });

    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateAccessToken(newUser._id);

    await Token.create({
      token: refreshToken,
      user: newUser._id,
    });

    cookies.set(res, 'refreshToken', refreshToken);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        id: newUser._id,
      },
      token: {
        accessToken,
      },
    });

    logger.info('User registered successfully', {
      userId: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    logger.error('Error during user signup', { error });
    next(error);
  }
};

export default signup;
