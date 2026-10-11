import express, { type Request, type Response, type Router } from "express";

const router: Router = express.Router();

router.get("/health", (req: Request, res: Response) => {
  res.send({
    status: "ok",
  });
});

export default router;
