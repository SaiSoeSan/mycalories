import express, { type Request, type Response, type Router } from "express";
import { authenticate } from "../middleware/auth.middleware.ts";
import calorieRouter from "./calorie.routes.ts";

const router: Router = express.Router();

router.use([authenticate]);
router.use("/calories", calorieRouter);

router.get("/health", (req: Request, res: Response) => {
  res.send({
    status: "ok",
  });
});

export default router;
