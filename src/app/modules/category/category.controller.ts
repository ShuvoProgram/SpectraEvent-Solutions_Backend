import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { CategoryService } from './category.service';


const createOrganize = catchAsync(async (req: Request, res: Response) => {
  const { ...CategoryData } = req.body;
  const adminId = req?.user?.userId;
  const result = await CategoryService.createCategory(CategoryData, adminId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category created successfully!',
    data: result,
  });
});

const getAllOrganize = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategorys();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category retrieved successfully',
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.getSingleCategory(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category get successfully',
    data: result,
  });
});

const updateOrganize = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await CategoryService.updateCategory(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully !',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.deleteCategory(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category deleted successfully',
    data: result,
  });
});

export const CategoryController = {
  createOrganize,
  getAllOrganize,
  getSingleCategory,
  updateOrganize,
  deleteCategory
}
