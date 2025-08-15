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
    const booking = await BookingModel.findOneAndDelete({
      _id: bookingId,
    }).exec();

    if (!booking) {
      return res.status(404).json({
        message: "Бронирование не найдено",
      });
    }

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
    const booking = await BookingModel.findOneAndUpdate(
      {
        _id: bookingId,
      },
      {
        user: req.userId,
        seats: req.body.seats,
        activity: req.body.activity,
        activityDate: req.body.activityDate,
      }
    ).exec();

    if (!booking) {
      return res.status(404).json({
        message: "Бронирование не найдено",
      });
    }

    //const booking = await bookingDoc.save();

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
