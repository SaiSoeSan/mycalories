import { z } from "zod";

export const createCalorieSchema = z.object({
  body: z.object({
    calories: z
      .number("Calories must be a number")
      .int("Calories must be a whole number")
      .positive("Calories must be greater than zero"),
    date: z.iso.date("Date must be a valid YYYY-MM-DD date").optional(),
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

export const dailyCaloriesSchema = z.object({
  body: z.object({}).default({}),
  query: z.object({
    date: z.iso.date("Date must be a valid YYYY-MM-DD date").optional(),
  }),
  params: z.object({}),
});

export const calorieIdSchema = z.object({
  body: z.object({}).default({}),
  query: z.object({}),
  params: z.object({
    id: z
      .string("Calorie entry ID is required")
      .regex(/^[1-9]\d*$/, "Calorie entry ID must be positive"),
  }),
});

export type CreateCalorieBody = z.infer<typeof createCalorieSchema>["body"];
export type DailyCaloriesQuery = z.infer<typeof dailyCaloriesSchema>["query"];
export type CalorieIdParams = z.infer<typeof calorieIdSchema>["params"];
