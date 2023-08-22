import express from "express";
import { login, logout, register } from "../controllers/authController";

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/logout").get(logout);

export default authRouter;
