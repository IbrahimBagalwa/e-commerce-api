import express from "express";
import {
  login,
  logout,
  register,
  verifyEmail,
} from "../controllers/authController";

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/logout").get(logout);
authRouter.route("/verify-email").post(verifyEmail);

export default authRouter;
