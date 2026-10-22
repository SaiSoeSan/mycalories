import { Router } from "express";
import { validate } from "../middleware/validate.ts";
import { updateProfileSchema } from "../schemas/profile.schema.ts";
import { updateProfile } from "../controllers/profile.controller.ts";

const router = Router();

router.put("/", validate(updateProfileSchema), updateProfile);

export default router;
