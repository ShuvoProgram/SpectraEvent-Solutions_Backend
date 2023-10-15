import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { BlogService } from "./blog.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import pick from "../../../utils/pick";
import { blogFilterableFields } from "./blog.constant";
import { paginationFields } from "../../../constants/pagination";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const { ...blogData } = req.body;
  const userId = req?.user?.userId;
  const result = await BlogService.createBlogs(blogData, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog created successfully!',
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.getSingleBlog(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog fetched successfully',
    data: result,
  });
});

const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, blogFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await BlogService.getAllBlog(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog retrieved successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await BlogService.updateBlog(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully !',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlog(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog
}