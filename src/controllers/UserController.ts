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

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Не удалось зарегистрироваться",
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
        message: "Неверный логин или пароль",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log("Не удалось авторизоваться");
    return res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const authMe = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (error) {
    res.status(403).json({
      message: "Не удалось авторизоваться",
    });
  }
};
