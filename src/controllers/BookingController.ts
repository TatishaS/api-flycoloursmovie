import { Request, Response } from "express";

import * as bookingService from "../services/bookingService";

export const getAll = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить брони",
    });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    const booking = await bookingService.getBookingById(bookingId);
    res.json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить данные бронирования",
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    const existing = await bookingService.getBookingById(bookingId);

    if (!existing) {
      return res.status(404).json({
        message: "Бронирование не найдено",
      });
    }

    if (existing.user.toString() !== req.userId && req.userRole !== "admin") {
      return res.status(403).json({
        message: "Вы можете удалять только свои бронирования",
      });
    }

    await bookingService.deleteBooking(bookingId);

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось удалить бронирование",
    });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.createBooking({
      userId: req.userId as string,
      seats: req.body.seats,
      activity: req.body.activity,
      activityDate: req.body.activityDate,
    });

    res.json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось забронировать места",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    const existing = await bookingService.getBookingById(bookingId);

    if (!existing) {
      return res.status(404).json({
        message: "Бронирование не найдено",
      });
    }

    if (existing.user.toString() !== req.userId && req.userRole !== "admin") {
      return res.status(403).json({
        message: "Вы можете изменять только свои бронирования",
      });
    }

    const booking = await bookingService.updateBooking(bookingId, {
      seats: req.body.seats,
      activity: req.body.activity,
      activityDate: req.body.activityDate,
    });

    res.json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить бронирование",
    });
  }
};
