import ActivityModel from "../models/Activity";
import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response) => {
  try {
    const activities = await ActivityModel.find().populate("user").exec();
    res.json(activities);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить мероприятия",
    });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const activityId = req.params.id;
    const activity = await ActivityModel.findById(activityId).exec();
    res.json(activity);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить данные о мероприятии",
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const activityId = req.params.id;
    const activity = await ActivityModel.findOneAndDelete({
      _id: activityId,
    }).exec();

    if (!activity) {
      return res.status(404).json({
        message: "Мероприятие не найдено",
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось удалить мероприятие",
    });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const activityDoc = new ActivityModel({
      user: req.userId,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      type: req.body.type,
      originalLanguage: req.body.originalLanguage,
      subtitlesLanguage: req.body.subtitlesLanguage,
      date: req.body.date,
      time: req.body.time,
      free: req.body.free,
      price: req.body.price,
    });

    const activity = await activityDoc.save();

    res.json(activity);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать мероприятие",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const activityId = req.params.id;
    const activity = await ActivityModel.findOneAndUpdate(
      {
        _id: activityId,
      },
      {
        user: req.userId,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        type: req.body.type,
        originalLanguage: req.body.originalLanguage,
        subtitlesLanguage: req.body.subtitlesLanguage,
        date: req.body.date,
        time: req.body.time,
        free: req.body.free,
        price: req.body.price,
        occupiedSeats: req.body.occupiedSeats,
      }
    ).exec();

    if (!activity) {
      return res.status(404).json({
        message: "Мероприятие не найдено",
      });
    }

    //const booking = await bookingDoc.save();

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить информацию о мероприятии",
    });
  }
};
