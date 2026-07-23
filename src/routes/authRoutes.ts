import { Router } from "express";

import { registerValidation, loginValidation } from "../validations";
import checkAuth from "../utils/checkAuth";
import checkValidationErrors from "../utils/checkValidationErrors";
import { UserController } from "../controllers/index";
import { loginRateLimit } from "../utils/rateLimit";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log in with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginRequest"
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/User"
 *                 - type: object
 *                   properties:
 *                     token:
 *                       type: string
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ValidationError"
 *       403:
 *         description: Invalid login or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

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
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterRequest"
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/User"
 *                 - type: object
 *                   properties:
 *                     token:
 *                       type: string
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ValidationError"
 */

router.post(
  "/register",
  registerValidation,
  checkValidationErrors,
  UserController.register,
);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get the currently authenticated user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       403:
 *         description: No access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

router.get("/me", checkAuth, UserController.authMe);

export default router;
