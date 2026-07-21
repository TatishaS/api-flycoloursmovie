import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError";

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
};

// Express identifies error-handling middleware by its 4-argument signature —
// keep all four params even though `next` is unused.
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.log(err);
  res.status(500).json({ message: "Internal server error" });
};
