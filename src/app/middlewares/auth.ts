/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer && tokenWithBearer.split(' ')[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token!');
    }

    const { role, email, iat } = decoded;

    
    const user = await User.isUserExistByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

   
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
    }

    
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking role authorization
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;
