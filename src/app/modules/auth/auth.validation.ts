import { z } from "zod";
import { role } from "./auth.constant";

const createUserZodSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "firstName is required"
    }),
    lastName: z.string({
      required_error: "lastName is required"
    }),
    email: z.string({
      required_error: "Email is required"
    }),
    password: z.string().min(6, { message: 'Password too short' }),
    role: z.enum([...role] as [string, ...string[]]).optional(),
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

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(6, { message: 'Password too short' }),
    newPassword: z.string().min(6, { message: 'Password too short' }),
  }),
});

export const AuthValidation = {
  createUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema
}