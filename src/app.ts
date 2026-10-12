import express, { type Express, type Request, type Response } from "express";
import authRouter from "./routes/auth.routes.ts";
import apiRouter from "./routes/api.routes.ts";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api", apiRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
