import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { FeedbackService } from "./feedback.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const createFeedback = catchAsync(async (req: Request, res: Response) => {
    const result = await FeedbackService.createFeedback(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Feedback created successfully",
        data: result
    });
})

const getFeedback = catchAsync(async (req: Request, res: Response) => {
    const result = await FeedbackService.getFeedback(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Feedback fetched successfully",
        data: result
    })
})

const updateFeedback = catchAsync(async (req: Request, res: Response) => {
    const result = await FeedbackService.updateFeedback(req.params.id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Feedback updated successfully.',
      data: result,
    });
  });

  const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
    await FeedbackService.deleteFeedback(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Feedback deleted successfully.',
    });
  });

  const listFeedback = catchAsync(async (req: Request, res: Response) => {
    const result = await FeedbackService.getAllFeedback();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Feedback all successfully.',
      data: result,
    });
  });

export const FeedbackController = {
    createFeedback,
    getFeedback,
    updateFeedback,
    deleteFeedback,
    listFeedback
}