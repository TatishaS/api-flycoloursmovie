import { NextFunction, Request, Response } from "express";

// Must run after checkAuth — relies on req.userRole set there.
export default (req: Request, res: Response, next: NextFunction) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
};
