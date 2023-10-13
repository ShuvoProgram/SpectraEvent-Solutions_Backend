import {z} from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "User ID required"
    }),
    serviceId: z.string({
      required_error: "Service ID required"
    }),
    rating: z.string({
      required_error: "Rating is required"
    }),
    comment: z.string({
      required_error: "Comment is required"
    })
  })
});

const updateReviewZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "User ID required"
    }),
    serviceId: z.string({
      required_error: "Service ID required"
    }),
    rating: z.string({
      required_error: "Rating is required"
    }),
    comment: z.string({
      required_error: "Comment is required"
    })
  })
});

export const ReviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema
}