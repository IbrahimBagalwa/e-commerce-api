import express, { Express } from "express";
import notFoundMiddleware from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";
import dotenv from "dotenv";
import "express-async-errors";
dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorHandler);

export default app;
