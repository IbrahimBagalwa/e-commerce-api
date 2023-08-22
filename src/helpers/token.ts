import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors";
import { Response } from "express";

const { JWT_EXPIRE_IN_HRS, JWT_SECRET_KEY } = process.env;
export interface PayloadUser {
  userId: string;
  username: string;
  role: string;
}
const generateToken = (payload: PayloadUser): string => {
  if (typeof JWT_SECRET_KEY !== "string")
    throw new BadRequestError("JWT secret key must be provided");
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE_IN_HRS,
  });
  return token;
};

const verifyToken = (token: string) => {
  if (typeof JWT_SECRET_KEY !== "string")
    throw new BadRequestError("JWT secret key must be provided");
  return jwt.verify(token, JWT_SECRET_KEY);
};

const attachCookiesToResponse = (res: Response, user: PayloadUser) => {
  const token = generateToken(user);
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV !== "production",
    signed: true,
  });
};
export { generateToken, verifyToken, attachCookiesToResponse };
