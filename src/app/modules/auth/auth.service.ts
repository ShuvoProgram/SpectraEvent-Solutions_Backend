import httpStatus from "http-status";
import { IChangePassword, ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import prisma from "../../../utils/prisma";
import bcrypt from 'bcrypt';
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";

const loginUser = async (data: ILoginUser): Promise<ILoginUserResponse> => {
  const {email, password} = data;

  if(!email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is required');
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const admin = await prisma.admin.findUnique({
    where: {
      email: email
    }
  })

   if(user?.email === email) {
    if(!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if(!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password mismatch');
  }

  const {id: userId, role} = user;
  const accessToken = jwtHelpers.createToken(
    {userId, role},
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {userId, role},
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange
  }
  } else {
    if(!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  }
   const isPasswordMatched = await bcrypt.compare(password, admin.password);

  if(!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password mismatch');
  }

  const {id: userId, role} = admin;
  const accessToken = jwtHelpers.createToken(
    {userId, role},
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {userId, role},
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: admin.needsPasswordChange
  }}}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token')
  }

  const {userId} = verifiedToken;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if(!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  };

  const newAccessToken = jwtHelpers.createToken(
    {
      id: user.id,
      role: user.role
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken
  }
}

const changePassword = async (
  userId: string,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  const admin = await prisma.admin.findUnique({
    where: { id: userId }
  })

  if(user?.id === userId) {
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }
    const isOldPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: newHashedPassword,
      needsPasswordChange: false,
    },
  });
  } else {
    if(!admin) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
    }
    const isOldPasswordMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isOldPasswordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.admin.update({
      where: { id: userId },
      data: {
        password: newHashedPassword,
        needsPasswordChange: false,
      }
    })
  }
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword
}