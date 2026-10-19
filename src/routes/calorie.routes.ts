import { Router } from "express";
import {
  createCalorie,
  deleteCalorie,
  getDailyCalories,
} from "../controllers/calorie.controller.ts";
import { validate } from "../middleware/validate.ts";
import {
  calorieIdSchema,
  createCalorieSchema,
  dailyCaloriesSchema,
} from "../schemas/calorie.schema.ts";

const router = Router();

router.post("/", validate(createCalorieSchema), createCalorie);
router.get("/", validate(dailyCaloriesSchema), getDailyCalories);
router.delete("/:id", validate(calorieIdSchema), deleteCalorie);

export default router;
