import { z } from "zod";

export const createCalorieSchema = z.object({
  body: z.object({
    calories: z
      .number("Calories must be a number")
      .int("Calories must be a whole number")
      .positive("Calories must be greater than zero"),
    date: z.iso
      .datetime("Date must be a valid ISO 8601 date string")
      .optional(),
    mealType: z.enum(["BREAKFAST", "LUNCH", "DINNER", "SNACK"]).optional(),
    description: z
      .string()
      .trim()
      .max(500, "Description must be at most 500 characters long")
      .optional(),
  }),
  query: z.object({}),
  params: z.object({}),
});

export type CreateCalorieBody = z.infer<typeof createCalorieSchema>["body"];
