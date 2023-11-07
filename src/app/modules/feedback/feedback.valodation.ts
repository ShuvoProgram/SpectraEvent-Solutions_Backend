import {z} from 'zod';

const createFeedbackZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Please enter a your name",
        }),
        email: z.string({
            required_error: "Please enter your email",
        }),
        message: z.string({
            required_error: "Please enter a message",
        }),
        isPublished: z.boolean({
            required_error: "Please enter a published"
        }).optional()
    })
})

const updateFeedbackZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Please enter a your name",
        }).optional(),
        email: z.string({
            required_error: "Please enter your email",
        }).optional(),
        message: z.string({
            required_error: "Please enter a message",
        }).optional(),
        isPublished: z.boolean({
            required_error: "Please enter a published"
        }).optional()
    })
})

export const FeedbackValidation = {
    createFeedbackZodSchema,
    updateFeedbackZodSchema,
  };
  