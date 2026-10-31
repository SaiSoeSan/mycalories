import { Router } from "express";
import { validate } from "../middleware/validate.ts";
import { updateProfileSchema } from "../schemas/profile.schema.ts";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.ts";

const router = Router();

router.get("/", getProfile);

router.put("/", validate(updateProfileSchema), updateProfile);

export default router;
