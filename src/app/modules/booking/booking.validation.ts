import { z } from 'zod';

const createBookingZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User is required ',
    }).optional(),
    eventId: z.string({
      required_error: 'event Id is required ',
    }),
    date: z.string({
      required_error: 'Date is required ',
    }),
    status: z.number({
      required_error: 'Status is required ',
    }).optional(),
  }),
});

const updateBookingZodSchema = z.object({
  body: z.object({
    date: z.string({
      required_error: 'Date is required ',
    }).optional(),
    status: z.number({
      required_error: 'Status is required ',
    }).optional(),
  }),
});

export const BookingValidation = {
  createBookingZodSchema,
  updateBookingZodSchema,
};
