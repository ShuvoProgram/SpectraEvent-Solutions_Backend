import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import { OrganizationService } from './organization.service';
import sendResponse from '../../../utils/sendResponse';


const createOrganize = catchAsync(async (req: Request, res: Response) => {
  const { ...organizationData } = req.body;
  const adminId = req?.user?.userId;
  const result = await OrganizationService.createOrganization(organizationData, adminId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Organization created successfully!',
    data: result,
  });
});

const getAllOrganize = catchAsync(async (req: Request, res: Response) => {
  const result = await OrganizationService.getAllOrganizations();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Organization retrieved successfully',
    data: result,
  });
});

const getSingleOrganization = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrganizationService.getSingleOrganization(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Organization get successfully',
    data: result,
  });
});

const updateOrganize = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await OrganizationService.updateOrganization(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Organization updated successfully !',
    data: result,
  });
});

const deleteOrganization = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrganizationService.deleteOrganization(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category deleted successfully',
    data: result,
  });
});

export const OrganizationController = {
  createOrganize,
  getAllOrganize,
  getSingleOrganization,
  updateOrganize,
  deleteOrganization
}
