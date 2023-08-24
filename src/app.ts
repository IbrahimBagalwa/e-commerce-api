import express, { Express, Request, Response } from "express";
import notFoundMiddleware from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";
import dotenv from "dotenv";
import "express-async-errors";
dotenv.config();
import morgan from "morgan";
import authRouter from "./routes/authRoute";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute";
import authenticatedUser from "./middleware/authentication";
import productRouter from "./routes/productRoute";
import fileUpload from "express-fileupload";
import reviewRouter from "./routes/reviewRoute";
const app: Express = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET_KEY));

app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req: Request, res: Response) => {
  return res.send("backend e-commerce api");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticatedUser, userRouter);
app.use("/api/v1/products", authenticatedUser, productRouter);
app.use("/api/v1/reviews", authenticatedUser, reviewRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);

export default app;
