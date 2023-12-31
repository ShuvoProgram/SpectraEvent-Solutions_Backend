import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { UserService } from "../user/user.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import config from "../../../config";
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import jwt from 'jsonwebtoken';
import ApiError from "../../../errors/ApiError";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const {...userData} = req.body;
  const result = await UserService.createUser(userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  })
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const {refreshToken, ...others} = result;

  //set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User signed in successfully',
    data: others
  })
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New access token generated successfully !',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;

  const { ...passwordData } = req.body;

  await AuthService.changePassword(userId, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully !',
  });
});

export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
  changePassword
}