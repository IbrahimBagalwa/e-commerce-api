import express, { Express } from "express";
import notFoundMiddleware from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";
const app: Express = express();

app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorHandler);

export default app;
