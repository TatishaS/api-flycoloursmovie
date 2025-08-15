import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface CustomJwtPayload extends JwtPayload {
  _id: Record<string, any>;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY
      ) as CustomJwtPayload;

      req.userId = decoded._id;
      next();
    } catch (error) {
      return res.status(403).json({
        message: "Нет доступа",
      });
    }
  } else {
    return res.status(403).json({
      message: "Нет доступа",
    });
  }
};
