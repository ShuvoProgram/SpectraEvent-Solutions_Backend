import { z } from 'zod';

const createEventZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Name is required ',
    }),
    CategoryId: z.string({
      required_error: 'CategoryId is required'
    }),
    description: z.string({
      required_error: 'duration is required ',
    }),
    facility: z
      .string({
        required_error: 'facility is required ',
      })
      .optional(),
      vanueId: z.string({
        required_error: 'vanue is required ',
      }).optional(),
    price: z.number({
      required_error: 'price is required ',
    }),
    people: z.number({
      required_error: 'people is required ',
    }).optional(),
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
    }).optional(),
    CategoryId: z.string({
      required_error: 'CategoryId is required'
    }).optional(),
    description: z.string({
      required_error: 'duration is required ',
    }).optional(),
    facility: z
      .string({
        required_error: 'facility is required ',
      })
      .optional(),
    vanueId: z.string({
      required_error: 'vanue is required ',
    }).optional(),
    price: z.number({
      required_error: 'price is required ',
    }).optional(),
    people: z.number({
      required_error: 'people is required ',
    }).optional(),
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