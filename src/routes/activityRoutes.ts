import { Router } from "express";

import {
  activityCreateValidation,
  activityUpdateValidation,
} from "../validations";
import checkAuth from "../utils/checkAuth";
import checkAdmin from "../utils/checkAdmin";
import checkValidationErrors from "../utils/checkValidationErrors";
import { ActivityController } from "../controllers/index";

const router = Router();

/**
 * @swagger
 * /activities:
 *   post:
 *     tags:
 *       - Activities
 *     summary: Create an activity (admin only)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateActivityRequest"
 *     responses:
 *       200:
 *         description: Created activity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Activity"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       403:
 *         description: No access / admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

router.post(
  "/",
  checkAuth,
  checkAdmin,
  activityCreateValidation,
  checkValidationErrors,
  ActivityController.create,
);

/**
 * @swagger
 * /activities:
 *   get:
 *     tags:
 *       - Activities
 *     summary: Get all activities
 *     responses:
 *       200:
 *         description: List of activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Activity"
 */

router.get("/", ActivityController.getAll);

/**
 * @swagger
 * /activities/{id}:
 *   get:
 *     tags:
 *       - Activities
 *     summary: Get a single activity by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Activity found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Activity"
 *       404:
 *         description: Activity not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

router.get("/:id", ActivityController.getItem);

/**
 * @swagger
 * /activities/{id}:
 *   delete:
 *     tags:
 *       - Activities
 *     summary: Delete an activity (admin only)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Activity deleted
 *       403:
 *         description: No access / admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       404:
 *         description: Activity not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

router.delete("/:id", checkAuth, checkAdmin, ActivityController.remove);

/**
 * @swagger
 * /activities/{id}:
 *   patch:
 *     tags:
 *       - Activities
 *     summary: Update an activity (admin only)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateActivityRequest"
 *     responses:
 *       200:
 *         description: Updated activity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Activity"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       403:
 *         description: No access / admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

router.patch(
  "/:id",
  checkAuth,
  checkAdmin,
  activityUpdateValidation,
  checkValidationErrors,
  ActivityController.update,
);

export default router;
