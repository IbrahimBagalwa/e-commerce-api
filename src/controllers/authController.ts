import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { BadRequestError } from "../errors";

async function register(req: Request, res: Response) {
  const { email, username, password } = req.body;

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new BadRequestError("Email already exists");
  }

  const firstFiveUsers = (await User.countDocuments({})) < 4;
  const role = firstFiveUsers ? "admin" : "user";

  const user = await User.create({ username, password, email, role });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "created successfully",
    user,
    token,
  });
}

async function login(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Login successfully",
  });
}

async function logout(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "logout successfully",
  });
}
export { register, login, logout };
