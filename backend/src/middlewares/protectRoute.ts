import { NextFunction, Request, Response } from "express";
import { ApiError } from "./errorHandler";
import { verifyToken } from "../utils/jwt";

export const protectRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    throw new ApiError("Authentication token missing", 401);
  }

  const payload = verifyToken(token);

  if (!payload) {
    throw new ApiError("Invalid token", 401);
  }

  (req as any).user = { id: payload.userId };

  next();
};
