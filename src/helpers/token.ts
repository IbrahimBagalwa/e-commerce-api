import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors";

const { JWT_EXPIRE_IN_HRS, JWT_SECRET_KEY } = process.env;

const generateToken = (
  userId: string,
  username: string,
  role: string,
): string => {
  if (typeof JWT_SECRET_KEY !== "string")
    throw new BadRequestError("JWT secret key must be provided");
  const token = jwt.sign({ userId, username, role }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE_IN_HRS,
  });
  return token;
};

const verifyToken = (token: string) => {
  if (typeof JWT_SECRET_KEY !== "string")
    throw new BadRequestError("JWT secret key must be provided");
  return jwt.verify(token, JWT_SECRET_KEY);
};

export { generateToken, verifyToken };
