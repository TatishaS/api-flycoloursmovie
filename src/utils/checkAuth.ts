import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserRole } from "../types/user.types";

interface CustomJwtPayload extends JwtPayload {
  _id: string;
  role: UserRole;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY,
      ) as CustomJwtPayload;

      req.userId = decoded._id;
      req.userRole = decoded.role;
      next();
    } catch (error) {
      return res.status(403).json({
        message: "No access",
      });
    }
  } else {
    return res.status(403).json({
      message: "No access",
    });
  }
};
