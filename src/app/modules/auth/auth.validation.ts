import { z } from "zod";
import { role } from "./auth.constant";

const createUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required"
    }),
    password: z.string({
      required_error: "Password is required"
    }),
    role: z.enum([...role] as [string, ...string[]]),
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