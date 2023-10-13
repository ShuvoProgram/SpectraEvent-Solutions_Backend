import {string, z} from "zod";
import { role } from "./auth.constant";

const createUserZodSchema = z.object({
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

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required"
    }),
    password: z.string({
      required_error: "Password is required"
    })
  })
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required"
    })
  })
});

export const AuthValidation = {
  createUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema
}