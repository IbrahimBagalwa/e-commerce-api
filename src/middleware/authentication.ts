import { NextFunction, Request, Response } from "express";
import { UnAuthenticatedError } from "../errors";
import { verifyToken } from "../helpers/token";

const authenticatedUser = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.signedCookies;
  if (!token) {
    throw new UnAuthenticatedError("Authentication failed");
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { userId, username, role }: any = verifyToken(token);
    req.user = { userId, username, role };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication failed");
  }
};

export default authenticatedUser;
