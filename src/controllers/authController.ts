import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { BadRequestError, UnAuthenticatedError } from "../errors";
import { attachCookiesToResponse } from "../helpers/token";
import createUserToken from "../helpers/createUserToken";
import crypto from "crypto";
import sendVerifyEmail from "../helpers/sendMail/sendVerifyEmail";

async function register(req: Request, res: Response) {
  const { email, username, password } = req.body;

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new BadRequestError("Email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    username,
    password,
    email,
    role,
    verificationToken,
  });

  const originUrl = "http://localhost:3000";
  await sendVerifyEmail({
    username: user.username,
    email: user.email,
    originUrl,
    verificationToken: user.verificationToken,
  });
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message:
      "Created successfully, Please check your email to verify your account",
  });
}
async function verifyEmail(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({ msg: "Email verified" });
}
async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please all fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthenticatedError(
      "Account does not exist, please sign up first",
    );
  }
  if (!user.isVerified) {
    throw new UnAuthenticatedError(
      "Please verify your account before to login",
    );
  }

  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    throw new UnAuthenticatedError("Email or password incorrect");
  }

  const tokenUser = createUserToken(user);

  attachCookiesToResponse(res, tokenUser);

  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Login successfully",
    user: { ...tokenUser, email: user.email },
  });
}

async function logout(req: Request, res: Response) {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "logout successfully",
  });
}
export { register, login, logout, verifyEmail };
