import {z} from 'zod';

const createCategoryZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required'
    }).optional(),
    image: z.string({
      required_error: 'Image is required'
    }).optional()
  })
});

const updateCategoryZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required'
    }).optional(),
    image: z.string({
      required_error: 'Image is required'
    }).optional()
  })
})

export const CategoryValidation = {
  createCategoryZodSchema,
  updateCategoryZodSchema
}