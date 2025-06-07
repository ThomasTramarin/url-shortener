import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { ApiError } from "./errorHandler";

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      throw new ApiError("Body Validation Error", 400, {
        fields: fieldErrors,
      });
    }

    req.body = result.data;

    next();
  };
};
