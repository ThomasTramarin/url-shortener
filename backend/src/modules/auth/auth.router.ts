import { Router } from "express";
import { validateBody } from "../../middlewares/valiadateBody";
import { loginBodySchema, signupBodySchema } from "./auth.validator";
import asyncHandler from "express-async-handler";
import {
  loginController,
  logoutController,
  meController,
  signupController,
} from "./auth.controller";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateBody(signupBodySchema),
  asyncHandler(signupController)
);

authRouter.post(
  "/login",
  validateBody(loginBodySchema),
  asyncHandler(loginController)
);

authRouter.get(
  "/me",
  validateBody(loginBodySchema),
  asyncHandler(meController)
);

authRouter.delete("/logout", asyncHandler(logoutController));

export default authRouter;
