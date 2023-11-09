import { z } from "zod";

const updateUpdateZodSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "First name is required"
    }),
    middleName: z.string({
      required_error: "middle name is required"
    }).optional(),
    lastName: z.string({
      required_error:"Last name is required"
    }).optional(),
    gender: z.string({
      required_error: "Gender is required"
    }).optional(),
    bloodGroup: z.string({
      required_error: "Blood Group is required"
    }).optional(),
    contactNo: z.string({
      required_error: "ContactNo is required"
    }).optional(),
    dateOfBirth: z.string({
      required_error: "Date of birth is required"
    }).optional(),
    address: z.string({
      required_error: "Address is required"
    }).optional(),
    profileImage: z.string({
      required_error: "ProfileImage is required"
    }).optional(),
    bio: z.string({
      required_error: "Biography is required"
    }).optional(),
  })
})

export const UserValidation = {
    updateUpdateZodSchema
};