import mongoose from "mongoose";
import { IUser } from "../types/user.types";

const UserSchema = new mongoose.Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    group: String,
    role: String,
    bookings: [String],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
