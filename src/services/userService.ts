import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HydratedDocument } from "mongoose";

import UserModel from "../models/User";
import { IUser } from "../types/user.types";

export const toSafeUser = (user: HydratedDocument<IUser>) => {
  const { passwordHash, ...userData } = user.toObject();
  return userData;
};

const signToken = (user: HydratedDocument<IUser>) =>
  jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });

export const registerUser = async (data: {
  fullname: string;
  email: string;
  password: string;
  group?: string;
}) => {
  const alg = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(data.password, alg);

  const userDoc = new UserModel({
    fullname: data.fullname,
    email: data.email,
    passwordHash,
    group: data.group,
    role: "all_users",
  });

  const user = await userDoc.save();

  return { user: toSafeUser(user), token: signToken(user) };
};

export const authenticateUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return null;
  }

  return { user: toSafeUser(user), token: signToken(user) };
};

export const getUserById = async (userId: string) => {
  const user = await UserModel.findById(userId);
  return user ? toSafeUser(user) : null;
};

export const getAllUsers = async () => {
  const users = await UserModel.find();
  return users.map(toSafeUser);
};

export const updateUser = async (
  userId: string,
  data: { fullname?: string; email?: string; group?: string },
) => {
  const user = await UserModel.findOneAndUpdate(
    { _id: userId },
    {
      fullname: data.fullname,
      email: data.email,
      group: data.group,
    },
    { new: true },
  ).exec();

  return user ? toSafeUser(user) : null;
};
