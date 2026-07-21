import express from "express";
import { UserRole } from "../user.types";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: UserRole;
    }
  }
}
