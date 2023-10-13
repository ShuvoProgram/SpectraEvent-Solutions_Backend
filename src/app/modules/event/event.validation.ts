import { z } from 'zod';

const createEventZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Name is required ',
    }),
    organizationId: z.string({
      required_error: 'OrganizationId is required'
    }),
    location: z.string({
      required_error: 'location is required ',
    }),
    price: z.number({
      required_error: 'Password is required ',
    }),
    people: z.string({
      required_error: 'people is required ',
    }),
    duration: z.string({
      required_error: 'duration is required ',
    }),
    description: z.string({
      required_error: 'duration is required ',
    }),
    facility: z
      .string({
        required_error: 'facility is required ',
      })
      .optional(),
    eventImg: z
      .string({
        required_error: 'image is required ',
      })
      .optional(),
  }),
});

const updateEventZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Name is required ',
    }),
    organizationId: z.string({
      required_error: 'OrganizationId is required'
    }),
    location: z.string({
      required_error: 'location is required ',
    }),
    price: z.number({
      required_error: 'Password is required ',
    }),
    people: z.string({
      required_error: 'people is required ',
    }),
    duration: z.string({
      required_error: 'duration is required ',
    }),
    description: z.string({
      required_error: 'duration is required ',
    }),
    facility: z
      .string({
        required_error: 'facility is required ',
      })
      .optional(),
    eventImg: z
      .string({
        required_error: 'image is required ',
      })
      .optional(),
  }),
});

export const EventValidation = {
  createEventZodSchema,
  updateEventZodSchema
}