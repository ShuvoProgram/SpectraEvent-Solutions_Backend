import { Request, Response } from "express";
import httpStatus from "http-status";
import { AdminService } from "./admin.service";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AdminService.createAdmin(userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully!',
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllAdmins();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getSingleAdmin(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User get successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await AdminService.updateAdmin(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully !",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.deleteAdmin(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User deleted successfully",
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const userRole = req.user?.role;

  const result = await AdminService.getMyProfile(userId, userRole);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My Profile retrieved successfully",
    data: result,
  });
});

export const AdminController = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  getMyProfile
};