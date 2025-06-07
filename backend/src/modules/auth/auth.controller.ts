import { Request, Response } from "express";
import { ApiError } from "../../middlewares/errorHandler";
import bcrypt from "bcrypt";
import createUser from "../../db/repositories/createUser";
import getUserByEmail from "../../db/repositories/getUserByEmail";
import jwt from "jsonwebtoken";
import { generateToken, verifyToken } from "../../utils/jwt";
import getUserById from "../../db/repositories/getUserById";
import { getSafeUser } from "../../utils/user";

export const signupController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const exists = await getUserByEmail(email);

  if (exists) {
    throw new ApiError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser(email, hashedPassword);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
  });
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    throw new ApiError("Invalid username/password", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError("Invalid username/password", 401);
  }

  // Success: generate a JWT token and set the cookie
  const token = generateToken({ userId: user.id });

  const safeUser = getSafeUser(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
  });

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user: safeUser,
    token,
  });
};

export const meController = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    throw new ApiError("Authentication token missing", 401);
  }

  const payload = verifyToken(token);

  const user = await getUserById(payload.userId);

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const safeUser = getSafeUser(user);

  res.status(200).json({
    success: true,
    message: "User session verified",
    user: safeUser,
  });
};

export const logoutController = (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
