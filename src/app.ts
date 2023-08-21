import express, { Express, Request, Response } from "express";
import notFoundMiddleware from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";
import dotenv from "dotenv";
import "express-async-errors";
dotenv.config();
import morgan from "morgan";
import authRouter from "./routes/authRoute";

const app: Express = express();

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  return res.send("backend e-commerce api");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);

export default app;
