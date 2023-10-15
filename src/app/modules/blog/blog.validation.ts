import { z } from 'zod';

const createBlogZodSchema = z.object({
  body: z.object({
    contentType: z.string({
      required_error: 'Content Type is required ',
    }),
    title: z.string({
      required_error: 'Title is required ',
    }),
    date: z.string({
      required_error: 'Date is required ',
    }),
    content: z.string({
      required_error: 'Content is required ',
    }),
  }),
});

const updateBlogZodSchema = z.object({
  body: z.object({
    contentType: z
      .string({
        required_error: 'Content Type is required ',
      })
      .optional(),
    title: z
      .string({
        required_error: 'Title is required ',
      })
      .optional(),
    date: z
      .string({
        required_error: 'Date is required ',
      })
      .optional(),
    content: z
      .string({
        required_error: 'Content is required ',
      })
      .optional(),
  }),
});

export const BlogValidation = {
  createBlogZodSchema,
  updateBlogZodSchema,
};
