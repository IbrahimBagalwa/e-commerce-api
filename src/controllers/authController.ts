import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

async function register(req: Request, res: Response) {
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "created successfully",
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
