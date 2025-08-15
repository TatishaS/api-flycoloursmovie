import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";

import helmet from "helmet";

import {
  registerValidation,
  loginValidation,
  bookingCreateValidation,
  activityCreateValidation,
} from "./validations";

import checkAuth from "./utils/checkAuth";
import checkValidationErrors from "./utils/checkValidationErrors";

import {
  UserController,
  BookingController,
  ActivityController,
} from "./controllers/index";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGDODB_URI: string;
      PORT: string;
      SECRET_KEY: string;
    }
  }
}

mongoose
  .connect(process.env.MONGDODB_URI)
  .then(() => console.log("Database ok"))
  .catch((error) => {
    console.log("Database error", error);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    callback(null, "uploads");
  },

  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(helmet());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",

  loginValidation,
  checkValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  checkValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.authMe);

app.post(
  "/bookings",
  checkAuth,
  bookingCreateValidation,
  checkValidationErrors,
  BookingController.create
);
app.get("/bookings", checkAuth, BookingController.getAll); // Переписать на checkAdmin, сделать доступными только админу
app.get("/bookings/:id", checkAuth, BookingController.getItem);
app.delete(
  "/bookings/:id",
  checkAuth,
  bookingCreateValidation,
  BookingController.remove
);
app.patch(
  "/bookings/:id",
  checkAuth,
  bookingCreateValidation,
  checkValidationErrors,
  BookingController.update
); // Возможно, функция не нужна

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file?.originalname}`,
  });
});

app.post(
  "/activities",
  checkAuth,
  activityCreateValidation,
  ActivityController.create
);
app.get("/activities", ActivityController.getAll);
app.get("/activities/:id", ActivityController.getItem);
app.delete("/activities/:id", checkAuth, ActivityController.remove);
app.patch(
  "/activities/:id",
  checkAuth,
  activityCreateValidation,
  ActivityController.update
);

app.listen(process.env.PORT || 5555, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Server OK");
});
