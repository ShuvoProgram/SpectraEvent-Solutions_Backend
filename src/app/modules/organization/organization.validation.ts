import {z} from 'zod';

const createOrganizationZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required'
    }),
    image: z.string({
      required_error: 'Image is required'
    })
  })
});

const updateOrganizationZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required'
    }).optional(),
    image: z.string({
      required_error: 'Image is required'
    }).optional()
  })
})

export const OrganizationValidation = {
  createOrganizationZodSchema,
  updateOrganizationZodSchema
}