import express, { Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import cors from "cors";
import helmet from "helmet";
import { setupDocs } from "./utils/documentation";

import {
  registerValidation,
  loginValidation,
  bookingCreateValidation,
  activityCreateValidation,
  activityUpdateValidation,
} from "./validations";

import checkAuth from "./utils/checkAuth";
import checkAdmin from "./utils/checkAdmin";
import checkValidationErrors from "./utils/checkValidationErrors";

import {
  UserController,
  BookingController,
  ActivityController,
} from "./controllers/index";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      PORT: string;
      SECRET_KEY: string;
    }
  }
}

const requiredEnvVars = ["MONGODB_URI", "SECRET_KEY"] as const;
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database ok"))
  .catch((error) => {
    console.log("Database error", error);
  });

const app = express();

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    callback(null, "uploads");
  },

  filename: (_, file, callback) => {
    const extension = path.extname(file.originalname);
    callback(null, `${crypto.randomUUID()}${extension}`);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  if (!ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
    return callback(new Error("Unsupported file type"));
  }
  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

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
app.get("/bookings", checkAuth, checkAdmin, BookingController.getAll);
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
    url: `/uploads/${req.file?.filename}`,
  });
});

app.post(
  "/activities",
  checkAuth,
  checkAdmin,
  activityCreateValidation,
  ActivityController.create,
);
app.get("/activities", ActivityController.getAll);
app.get("/activities/:id", ActivityController.getItem);
app.delete(
  "/activities/:id",
  checkAuth,
  checkAdmin,
  ActivityController.remove,
);
app.patch(
  "/activities/:id",
  checkAuth,
  checkAdmin,
  activityUpdateValidation,
  checkValidationErrors,
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
