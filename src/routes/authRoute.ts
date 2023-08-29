import express from "express";
import {
  login,
  logout,
  register,
  verifyEmail,
} from "../controllers/authController";
import authenticatedUser from "../middleware/authentication";

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/logout").delete(authenticatedUser, logout);
authRouter.route("/verify-email").post(verifyEmail);

export default authRouter;
