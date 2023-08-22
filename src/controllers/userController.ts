import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { NotFoundError } from "../errors";

async function getSingleUser(req: Request, res: Response) {
  const { id } = req.params;
  console.log(req.user);
  const user = await User.findOne({ _id: id, role: "user" }).select(
    "-password",
  );

  if (!user) {
    throw new NotFoundError(`No user found with id ${id}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "User retrieved successfully",
    user,
  });
}
async function getAllUsers(req: Request, res: Response) {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Users retrieved successfully",
    users,
  });
}

async function showCurrentUser(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Current user retrieved successfully",
  });
}

async function updateUser(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "User updated successfully",
  });
}

async function updateUserPassword(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "User Password updated successfully",
  });
}

export {
  getSingleUser,
  getAllUsers,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
