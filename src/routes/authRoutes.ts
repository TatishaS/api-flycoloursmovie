import { Router } from "express";

import { registerValidation, loginValidation } from "../validations";
import checkAuth from "../utils/checkAuth";
import checkValidationErrors from "../utils/checkValidationErrors";
import { UserController } from "../controllers/index";
import { loginRateLimit } from "../utils/rateLimit";

const router = Router();

router.post(
  "/login",
  loginRateLimit,
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

router.post(
  "/register",
  registerValidation,
  checkValidationErrors,
  UserController.register,
);

router.get("/me", checkAuth, UserController.authMe);

export default router;
