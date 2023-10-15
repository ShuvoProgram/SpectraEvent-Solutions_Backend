import { z } from 'zod';

const createFavoriteZodSchema = z.object({
  body: z.object({
    userId: z.string(),
    serviceId: z.string(),
  }),
});

export const FavoriteValidation = {
  createFavoriteZodSchema,
};