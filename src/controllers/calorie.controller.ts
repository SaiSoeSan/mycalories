import type { Request, Response } from "express";
import { models } from "../prisma/db.ts";
import type {
  CalorieIdParams,
  CreateCalorieBody,
  DailyCaloriesQuery,
} from "../schemas/calorie.schema.ts";

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

const getDailyCalories = async (
  req: Request<{}, {}, {}, DailyCaloriesQuery>,
  res: Response,
) => {
  const userId = req.user?.userId;

  if (userId === undefined) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const day = req.query.date ?? new Date().toISOString().slice(0, 10);

  const dailyEntries = models.calorieEntry
    .where({ userId })
    .where({ date: day });

  const [entries, totals] = await Promise.all([
    dailyEntries.orderBy((entry) => entry.date.asc()).all(),
    dailyEntries.aggregate((aggregate) => ({
      totalCalories: aggregate.sum("calories"),
    })),
  ]);

  res.status(200).json({
    date: day,
    totalCalories: totals.totalCalories ?? 0,
    entries,
  });
};

const deleteCalorie = async (req: Request<CalorieIdParams>, res: Response) => {
  const userId = req.user?.userId;

  if (userId === undefined) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const id = Number(req.params.id);

  const calorieEntry = await models.calorieEntry.where({ id, userId }).first();

  if (!calorieEntry) {
    res.status(404).json({ error: "Calorie entry not found" });
    return;
  }

  await models.calorieEntry.where({ id, userId }).delete();

  res.status(204).send({
    message: "Calorie entry deleted successfully",
  });
};

export { createCalorie, deleteCalorie, getDailyCalories };
