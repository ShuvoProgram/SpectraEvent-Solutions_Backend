import { z } from 'zod';

const createVanueZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required ',
    }),
    adminId: z.string({
      required_error: 'AdminId is required ',
    }).optional(),
  }),
});

const updateVanueZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required ',
      })
      .optional(),
    adminId: z
      .string({
        required_error: 'AdminId is required ',
      })
      .optional(),
  }),
});

export const VanueValidation = {
  createVanueZodSchema,
  updateVanueZodSchema,
};
