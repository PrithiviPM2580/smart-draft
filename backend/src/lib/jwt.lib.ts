import jwt from 'jsonwebtoken';
import { config } from '@/config/env';
import type { Types } from 'mongoose';

export const generateAccessToken = (userId: Types.ObjectId): string => {
  const payload = { userId: userId.toString() };
  return jwt.sign(payload, config.JWT_ACCESS_SECRET as string, {
    expiresIn: config.JWT_ACCESS_EXPIRATION as any,
    subject: 'accessApi',
  });
};

export const generateRefreshToken = (userId: Types.ObjectId): string => {
  const payload = { userId: userId.toString() };
  return jwt.sign(payload, config.JWT_REFRESH_SECRET as string, {
    expiresIn: config.JWT_REFRESH_EXPIRATION as any,
    subject: 'refreshApi',
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET as string);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.JWT_REFRESH_SECRET as string);
};
