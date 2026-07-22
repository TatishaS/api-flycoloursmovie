import { Request, Response } from "express";

import * as userService from "../services/userService";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/AppError";
import {
  RegisterRequestBody,
  LoginRequestBody,
  UpdateUserRequestBody,
} from "../types/user.types";

export const register = asyncHandler<
  Record<string, never>,
  unknown,
  RegisterRequestBody
>(async (req, res) => {
  const { user, token } = await userService.registerUser({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    group: req.body.group,
  });

  res.json({
    ...user,
    token,
  });
});

export const login = asyncHandler<
  Record<string, never>,
  unknown,
  LoginRequestBody
>(async (req, res) => {
  const result = await userService.authenticateUser(
    req.body.email,
    req.body.password,
  );

  if (!result) {
    throw new AppError(403, "Invalid login or password");
  }

  res.json({
    ...result.user,
    token: result.token,
  });
});

export const authMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.userId as string);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  res.json(user);
});

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

export const update = asyncHandler<{ id: string }, unknown, UpdateUserRequestBody>(
  async (req, res) => {
    const userId = req.params.id;

    if (req.userId !== userId && req.userRole !== "admin") {
      throw new AppError(403, "You can only update your own profile");
    }

    const user = await userService.updateUser(userId, {
      fullname: req.body.fullname,
      email: req.body.email,
      group: req.body.group,
    });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    res.json(user);
  },
);
