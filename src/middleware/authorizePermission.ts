import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError } from "../errors";

const authorizePermissions = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { role } = req.user;
  if (role !== "admin") {
    throw new UnAuthorizedError("Permission denied");
  }
  next();
};

export default authorizePermissions;
