import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { BookingService } from "./booking.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import pick from "../../../utils/pick";
import { bookingFilterableFields } from "./booking.constant";
import { paginationFields } from "../../../constants/pagination";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const { eventId, scheduleDate } = req.body;
  const result = await BookingService.createBooking(userId, eventId, scheduleDate);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const filters = pick(req.query, bookingFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await BookingService.getAllBooking(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Bookings fetched successfully',
    data: result,
  });
});

const getAllBookingForUser = catchAsync(async (req, res) => {
  const filters = pick(req.query, bookingFilterableFields);
  const options = pick(req.query, paginationFields);
  const userId = req?.user?.userId;
  const result = await BookingService.getAllBookingForUser(filters, options, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Bookings fetched successfully',
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.getSingleBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking fetched successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...bookingData } = req.body;
  const result = await BookingService.updateBooking(id, bookingData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.deleteBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.cancelBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Cancelled successfully',
    data: result,
  });
});

const confirmBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.confirmBooking(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking confirmed successfully',
    data: result,
  });
});

// const completedBooking = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await BookingService.completedBooking(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Booking confirmed successfully',
//     data: result,
//   });
// });

export const BookingController = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
  cancelBooking,
  confirmBooking,
  getAllBookingForUser
  // completedBooking
};