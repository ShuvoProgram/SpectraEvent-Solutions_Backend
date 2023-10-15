import { z } from "zod";
import { role } from "../auth/auth.constant";

const updateUpdateZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required"
    }).optional(),
    password: z.string({
      required_error: "Password is required"
    }).optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
     firstName: z.string({
      required_error: "First name is required"
    }),
    middleName: z.string({
      required_error: "middle name is required"
    }),
    lastName: z.string({
      required_error:"Last name is required"
    }),
    dateOfBirth: z.string({
      required_error: "Date of birth is required"
    }),
    contactNo: z.string({
      required_error: "ContactNo is required"
    }),
    gender: z.string({
      required_error: "Gender is required"
    }),
    bio: z.string({
      required_error: "Biography is required"
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

export const UserValidation = {
    updateUpdateZodSchema
};