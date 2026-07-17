import BookingModel from "../models/Booking";
import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response) => {
  try {
    const bookings = await BookingModel.find()
      .populate(["user", "activity"])
      .exec();
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
    const booking = await BookingModel.findById(bookingId).exec();
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
    const existing = await BookingModel.findById(bookingId).exec();

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

    await BookingModel.findOneAndDelete({ _id: bookingId }).exec();

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
    const reservationsNum = await BookingModel.countDocuments();
    const reservationNumber = reservationsNum + 1;
    const bookingDoc = new BookingModel({
      user: req.userId,
      seats: req.body.seats,
      activity: req.body.activity,
      activityDate: req.body.activityDate,
      reservationNumber,
    });

    const booking = await bookingDoc.save();

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
    const existing = await BookingModel.findById(bookingId).exec();

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

    await BookingModel.findOneAndUpdate(
      {
        _id: bookingId,
      },
      {
        seats: req.body.seats,
        activity: req.body.activity,
        activityDate: req.body.activityDate,
      }
    ).exec();

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить бронирование",
    });
  }
};
