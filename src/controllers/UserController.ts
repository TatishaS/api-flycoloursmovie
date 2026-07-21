import { Request, Response } from "express";

import * as userService from "../services/userService";

export const register = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Authorization failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await userService.authenticateUser(
      req.body.email,
      req.body.password,
    );

    if (!result) {
      return res.status(403).json({
        message: "Invalid login or password",
      });
    }

    res.json({
      ...result.user,
      token: result.token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Authorization failed",
    });
  }
};

export const authMe = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.userId as string);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(403).json({
      message: "Authorization failed",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get users",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (req.userId !== userId && req.userRole !== "admin") {
      return res.status(403).json({
        message: "You can only update your own profile",
      });
    }

    const user = await userService.updateUser(userId, {
      fullname: req.body.fullname,
      email: req.body.email,
      group: req.body.group,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "User update failed",
    });
  }
};
