import { Router } from "express";
import { createCalorie } from "../controllers/calorie.controller.ts";
import { validate } from "../middleware/validate.ts";
import { createCalorieSchema } from "../schemas/calorie.schema.ts";

const router = Router();

router.post("/", validate(createCalorieSchema), createCalorie);

export default router;
