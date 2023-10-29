import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import pick from "../../../utils/pick";
import { paginationFields } from "../../../constants/pagination";
import { VanueService } from "./vanue.service";
import { vanueFilterableFields } from "./vanue.constant";

const createVanue = catchAsync(async (req: Request, res: Response) => {
    const adminId = req?.user?.userId;
    const { ...faqData } = req.body;
    
  const result = await VanueService.createVanue(faqData, adminId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Vanue created successfully!',
    data: result,
  });
});

const getAllVanue = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, vanueFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await VanueService.getAllVanue(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Vanue retrieved successfully',
    data: result,
  });
});

const getSingleVanue = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await VanueService.getSingleVanue(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Vanue get successfully',
    data: result,
  });
});


const updateVanue = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await VanueService.updateVanue(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vanue updated successfully !',
    data: result,
  });
});

const deleteVanue = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await VanueService.deleteVanue(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Vanue deleted successfully',
    data: result,
  });
});

export const VanueController = {
    createVanue,
    getAllVanue,
    getSingleVanue,
    updateVanue,
    deleteVanue
};