import { z } from "zod";
import { role } from "../auth/auth.constant";

const createAdminZodSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "First name is required"
    }),
    middleName: z.string({
      required_error: "middle name is required"
    }),
    lastName: z.string({
      required_error:"Last name is required"
    }),
    email: z.string({
      required_error: "Email is required"
    }),
    password: z.string({
      required_error: "Password is required"
    }),
    role: z.enum([...role] as [string, ...string[]]),
    contactNo: z.string({
      required_error: "ContactNo is required"
    }),
    gender: z.string({
      required_error: "Gender is required"
    }),
    bloodGroup: z.string({
      required_error: "Blood Group is required"
    }),
    address: z.string({
      required_error: "Address is required"
    }),
    profileImage: z.string({
      required_error: "ProfileImage is required"
    })
  })
})

const updateAdminZodSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "First name is required"
    }),
    middleName: z.string({
      required_error: "middle name is required"
    }),
    lastName: z.string({
      required_error:"Last name is required"
    }),
    email: z.string({
      required_error: "Email is required"
    }),
    password: z.string({
      required_error: "Password is required"
    }),
    role: z.enum([...role] as [string, ...string[]]),
    contactNo: z.string({
      required_error: "ContactNo is required"
    }),
    gender: z.string({
      required_error: "Gender is required"
    }),
    bloodGroup: z.string({
      required_error: "Blood Group is required"
    }),
    address: z.string({
      required_error: "Address is required"
    }),
    profileImage: z.string({
      required_error: "ProfileImage is required"
    })
  })
})


export const AdminValidation = {
  createAdminZodSchema,
  updateAdminZodSchema
}