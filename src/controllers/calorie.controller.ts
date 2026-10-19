import type { Request, Response } from "express";
import { models } from "../prisma/db.ts";
import type { CreateCalorieBody } from "../schemas/calorie.schema.ts";

const createCalorie = async (
  req: Request<{}, {}, CreateCalorieBody>,
  res: Response,
) => {
  const userId = req.user?.userId;

  if (userId === undefined) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const { calories, date, mealType, description } = req.body;

  const calorieEntry = await models.calorieEntry.create({
    userId,
    calories,
    mealType: mealType ?? "BREAKFAST",
    description: description ?? null,
    ...(date === undefined ? {} : { date }),
  });

  res.status(201).json({ calorieEntry });
};

export { createCalorie };
