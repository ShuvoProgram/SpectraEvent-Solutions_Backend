import jwt, { JwtPayload, Secret, verify } from 'jsonwebtoken';
import config from '../config';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';

const secret: string = config.jwt.secret || '';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string): JwtPayload => {
  try {
    const isVerified = verify(token, secret) as JwtPayload;
    return isVerified;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token')
  }
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
