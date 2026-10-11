import express, { type Express, type Request, type Response } from "express";
import apiRouter from "./routes/api.ts";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use("/api", apiRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
