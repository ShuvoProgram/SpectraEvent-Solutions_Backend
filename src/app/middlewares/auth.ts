import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import ApiError from '../../errors/ApiError';

const auth =
  (...requiredRoles: string[]) =>
    async (req: any, res: Response, next: NextFunction) => {
      return new Promise(async (resolve, reject) => {
        const token = req.headers.authorization;

        if (!token) {
          return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
        }

        const verifiedUser = jwtHelpers.verifyToken(token);

        if (!verifiedUser) {
          return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
        }

        req.user = verifiedUser;

        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
          return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
        }

        resolve(verifiedUser);
      })
        .then(() => next())
        .catch((err) => next(err));
    };

export default auth;
