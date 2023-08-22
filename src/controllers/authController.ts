import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { BadRequestError, UnAuthenticatedError } from "../errors";
import { attachCookiesToResponse } from "../helpers/token";
import createUserToken from "../helpers/createUserToken";

async function register(req: Request, res: Response) {
  const { email, username, password } = req.body;

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new BadRequestError("Email already exists");
  }

  const firstFiveUsers = (await User.countDocuments({})) < 4;
  const role = firstFiveUsers ? "admin" : "user";

  const user = await User.create({ username, password, email, role });
  const tokenUser = createUserToken(user);

  attachCookiesToResponse(res, tokenUser);

  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "created successfully",
    user: { ...tokenUser, email: user.email },
  });
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
export { register, login, logout };
