import { z } from "zod";

export const updateProfileSchema = z.object({
  body: z.object({
    age: z
      .number("Age must be a number")
      .int("Age must be a whole number")
      .positive("Age must be greater than zero")
      .max(150, "Age must be less than or equal to 150")
      .optional(),
    height: z
      .number("Height must be a number")
      .positive("Height must be greater than zero")
      .optional(),
    weight: z
      .number("Weight must be a number")
      .positive("Weight must be greater than zero")
      .optional(),
    sex: z.enum(["MALE", "FEMALE"]).optional(),
  }),
  query: z.object({}),
  params: z.object({}),
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>["body"];
