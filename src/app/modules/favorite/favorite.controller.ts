import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { FavoriteService } from "./favorite.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const addFavorite = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const { ...data } = req.body;
  const result = await FavoriteService.addFavorite(data, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Favorite added successfully',
    data: result
  })
})
const updateFavorite = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const result = await FavoriteService.updateFavorite(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Favorite update successfully',
    data: result
  })
})
const removeFavorite = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FavoriteService.removeFavorite(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Favorite remove successfully',
    data: result
  })
})

const listFavorite = catchAsync(async (req: Request, res: Response) => {
  const result = await FavoriteService.listFavorite(req?.user?.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Favorite list retrieved successfully',
    data: result
  })
})

const getFavorite = catchAsync(async (req: Request, res: Response) => {
  const result = await FavoriteService.getFavorite(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Favorite retrieved successfully',
    data: result
  })
})

export const FavoriteController = {
  addFavorite,
  updateFavorite,
  removeFavorite,
  listFavorite,
  getFavorite
};