import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z
      .string("Email is required")
      .trim()
      .toLowerCase()
      .pipe(z.email("A valid email is required")),
    username: z
      .string("Username is required")
      .trim()
      .min(3, "Username must be at least 3 characters long")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Username must contain only letters and numbers",
      ),
    password: z
      .string("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    name: z
      .string()
      .trim()
      .max(100, "Name must be at most 100 characters long")
      .optional(),
  }),
  query: z.object({}),
  params: z.object({}),
});

export const loginSchema = z.object({
  body: z.object({
    username: z
      .string("Username is required")
      .trim()
      .min(1, "Username is required"),
    password: z.string("Password is required").min(1, "Password is required"),
  }),
  query: z.object({}),
  params: z.object({}),
});

export type RegisterBody = z.infer<typeof registerSchema>["body"];
export type LoginBody = z.infer<typeof loginSchema>["body"];
