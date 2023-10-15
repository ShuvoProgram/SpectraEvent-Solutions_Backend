import { z } from 'zod';

const createEventZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Name is required ',
    }),
    organizationId: z.string({
      required_error: 'OrganizationId is required'
    }),
     description: z.string({
      required_error: 'duration is required ',
    }),
     eventDate: z.string({
      required_error: 'Event Date is required ',
    }),
    facility: z
      .string({
        required_error: 'facility is required ',
      })
      .optional(),
    location: z.string({
      required_error: 'location is required ',
    }),
    price: z.number({
      required_error: 'Password is required ',
    }),
    maxCapacity: z.number({
      required_error: 'maxCapacity is required ',
    }),
   availableSeats: z.number({
    required_error: 'availableSeat is required ',
   }),
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
     description: z.string({
      required_error: 'duration is required ',
    }),
     eventDate: z.string({
      required_error: 'Event Date is required ',
    }),
    facility: z
      .string({
        required_error: 'facility is required ',
      })
      .optional(),
    location: z.string({
      required_error: 'location is required ',
    }),
    price: z.number({
      required_error: 'Password is required ',
    }),
    maxCapacity: z.number({
      required_error: 'maxCapacity is required ',
    }),
   availableSeat: z.number({
    required_error: 'availableSeat is required ',
   }),
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