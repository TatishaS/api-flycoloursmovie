import express, { Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";
import cors from "cors";
import helmet from "helmet";
import { setupDocs } from "./utils/documentation";

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
import checkAdmin from "./utils/checkAdmin";

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
app.use(cors());
app.use(helmet());
setupDocs(app);

app.use("/uploads", express.static("uploads"));

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: Health check
 *     description: Basic route to check if the api is running
 *     responses:
 *       200:
 *         description: Server is up and running.
 */

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to FlyColoursMovie REST API!");
});

app.post(
  "/auth/login",

  loginValidation,
  checkValidationErrors,
  UserController.login,
);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Регистрация нового пользователя
 *     description: Берет данные пользователя из body и пытается зарегистировать нового пользователя в базе
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               group:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 group:
 *                   type: string
 *                 role:
 *                   type: string
 *                 bookings:
 *                   type: array
 *                 "_id":
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                 token:
 *                   type: string
 */

app.post(
  "/auth/register",
  registerValidation,
  checkValidationErrors,
  UserController.register,
);
app.get("/auth/me", checkAuth, UserController.authMe);

app.post(
  "/bookings",
  checkAuth,
  bookingCreateValidation,
  checkValidationErrors,
  BookingController.create,
);
app.get("/bookings", checkAuth, BookingController.getAll); // Переписать на checkAdmin, сделать доступными только админу
app.get("/bookings/:id", checkAuth, BookingController.getItem);
app.delete(
  "/bookings/:id",
  checkAuth,
  bookingCreateValidation,
  BookingController.remove,
);
app.patch(
  "/bookings/:id",
  checkAuth,
  bookingCreateValidation,
  checkValidationErrors,
  BookingController.update,
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
  ActivityController.create,
);
app.get("/activities", ActivityController.getAll);
app.get("/activities/:id", ActivityController.getItem);
app.delete("/activities/:id", checkAuth, ActivityController.remove);
app.patch(
  "/activities/:id",
  checkAuth,
  activityCreateValidation,
  ActivityController.update,
);

app.get("/users", checkAuth, checkAdmin, UserController.getAll);
app.patch("/users/:id", checkAuth, UserController.update);

app.listen(process.env.PORT || 5555, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Server OK");
});
