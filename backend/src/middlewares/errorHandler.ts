import { NextFunction, Request, Response } from "express";

export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

interface ErrorResponseBody {
  statusCode: number;
  success: boolean;
  message: string;
  error?: unknown;
  stack?: string;
}

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isProd = process.env.NODE_ENV === "production";
  // If the error is an instance of ApiError, use its status code, otherwise default to 500
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message =
    err instanceof ApiError
      ? err.message // If the error is an instance of ApiError, use its message
      : isProd
      ? "Something went wrong" // If the NODE_ENV is production, use a generic message
      : err.message; // Otherwise, use the error message

  const responseBody: ErrorResponseBody = {
    statusCode,
    success: false,
    message: message,
  };

  // If the error is an instance of ApiError and has details, add them to the response body
  if (err instanceof ApiError && err.details) {
    responseBody.error = err.details;
  }

  // If the NODE_ENV is development, add the stack trace to the response body
  if (!isProd && err.stack) {
    responseBody.stack = err.stack;
  }

  // Log only errors that are not instance of ApiError
  if (!(err instanceof ApiError)) {
    console.error("Unexpected error:", err);
  }

  res.status(statusCode).json(responseBody);
};
