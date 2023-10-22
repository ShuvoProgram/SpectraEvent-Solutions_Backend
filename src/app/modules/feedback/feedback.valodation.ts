import {z} from 'zod';

const createFeedbackZodSchema = z.object({
    body: z.object({
        userId: z.string({
            required_error: "Please enter a user ID",
        }),
        comment: z.string({
            required_error: "Please enter a comment",
        }),
        suggestions: z.string({
            required_error: "Please enter a suggestions",
        })
    })
})

const updateFeedbackZodSchema = z.object({
    body: z.object({
        comment: z.string({
            required_error: "Please enter a comment",
        }),
        suggestions: z.string({
            required_error: "Please enter a suggestions",
        })
    })
})

export const FeedbackValidation = {
    createFeedbackZodSchema,
    updateFeedbackZodSchema,
  };
  