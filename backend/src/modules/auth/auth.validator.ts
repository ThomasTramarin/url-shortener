import { z } from "zod";

const baseAuthSchema = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .email("Please enter a valid email address"),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .trim()
    .min(8, "Password must be at least 8 characters long"),
};

export const signupBodySchema = z.object(baseAuthSchema);
export const loginBodySchema = z.object(baseAuthSchema);
