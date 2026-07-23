import { Router } from "express";

import { bookingCreateValidation } from "../validations";
import checkAuth from "../utils/checkAuth";
import checkAdmin from "../utils/checkAdmin";
import checkValidationErrors from "../utils/checkValidationErrors";
import { BookingController } from "../controllers/index";

const router = Router();

/**
 * @swagger
 * /bookings:
 *   post:
 *     tags:
 *       - Bookings
 *     summary: Create a booking
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateBookingRequest"
 *     responses:
 *       200:
 *         description: Created booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Booking"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       403:
 *         description: No access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

router.post(
  "/",
  checkAuth,
  bookingCreateValidation,
  checkValidationErrors,
  BookingController.create,
);

/**
 * @swagger
 * /bookings:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get all bookings (admin only)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Booking"
 *       403:
 *         description: No access / admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

router.get("/", checkAuth, checkAdmin, BookingController.getAll);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get a single booking by id
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
 *         description: Booking found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Booking"
 *       403:
 *         description: No access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       404:
 *         description: Booking not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

router.get("/:id", checkAuth, BookingController.getItem);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     tags:
 *       - Bookings
 *     summary: Cancel/delete a booking
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
 *         description: Booking deleted
 *       403:
 *         description: No access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       404:
 *         description: Booking not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

router.delete("/:id", checkAuth, BookingController.remove);

/**
 * @swagger
 * /bookings/{id}:
 *   patch:
 *     tags:
 *       - Bookings
 *     summary: Update a booking
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
 *             $ref: "#/components/schemas/UpdateBookingRequest"
 *     responses:
 *       200:
 *         description: Updated booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Booking"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       403:
 *         description: No access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

router.patch(
  "/:id",
  checkAuth,
  bookingCreateValidation,
  checkValidationErrors,
  BookingController.update,
);

export default router;
