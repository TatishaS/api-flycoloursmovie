import { Request, Response } from "express";

import * as bookingService from "../services/bookingService";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/AppError";
import {
  CreateBookingRequestBody,
  UpdateBookingRequestBody,
} from "../types/booking.types";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const bookings = await bookingService.getAllBookings();
  res.json(bookings);
});

export const getItem = asyncHandler<{ id: string }>(async (req, res) => {
  const bookingId = req.params.id;
  const booking = await bookingService.getBookingById(bookingId);
  res.json(booking);
});

export const remove = asyncHandler<{ id: string }>(async (req, res) => {
  const bookingId = req.params.id;
  const existing = await bookingService.getBookingById(bookingId);

  if (!existing) {
    throw new AppError(404, "Booking not found");
  }

  if (existing.user.toString() !== req.userId && req.userRole !== "admin") {
    throw new AppError(403, "You can only delete your own bookings");
  }

  await bookingService.deleteBooking(bookingId);

  res.json({
    success: true,
  });
});

export const create = asyncHandler<
  Record<string, never>,
  unknown,
  CreateBookingRequestBody
>(async (req, res) => {
  const booking = await bookingService.createBooking({
    userId: req.userId as string,
    seats: req.body.seats,
    activity: req.body.activity,
    activityDate: req.body.activityDate,
  });

  res.json(booking);
});

export const update = asyncHandler<
  { id: string },
  unknown,
  UpdateBookingRequestBody
>(async (req, res) => {
  const bookingId = req.params.id;
  const existing = await bookingService.getBookingById(bookingId);

  if (!existing) {
    throw new AppError(404, "Booking not found");
  }

  if (existing.user.toString() !== req.userId && req.userRole !== "admin") {
    throw new AppError(403, "You can only update your own bookings");
  }

  const booking = await bookingService.updateBooking(bookingId, {
    seats: req.body.seats,
    activity: req.body.activity,
    activityDate: req.body.activityDate,
  });

  res.json(booking);
});
