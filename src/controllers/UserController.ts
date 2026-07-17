import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

import UserModel from "../models/User";

export const register = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const alg = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, alg);

    const userDoc = new UserModel({
      fullname: req.body.fullname,
      email: req.body.email,
      passwordHash: passHash,
      group: req.body.group,
      role: "all_users",
    });

    const user = await userDoc.save();

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      },
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
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
    const user = await UserModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(403).json({
        message: "Invalid login or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash,
    );

    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Invalid login or password",
      });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Authorization failed",
    });
  }
};

export const authMe = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (error) {
    res.status(403).json({
      message: "Authorization failed",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
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

    const user = await UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        fullname: req.body.fullname,
        email: req.body.email,
        group: req.body.group,
      },
    ).exec();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "User update failed",
    });
  }
};
