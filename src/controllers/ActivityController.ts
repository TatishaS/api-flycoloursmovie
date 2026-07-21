import { Request, Response } from "express";

import * as activityService from "../services/activityService";

export const getAll = async (req: Request, res: Response) => {
  try {
    const activities = await activityService.getAllActivities();
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
    const activity = await activityService.getActivityById(activityId);
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
    const activity = await activityService.deleteActivity(activityId);

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
    const activity = await activityService.createActivity({
      userId: req.userId as string,
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
      duration: req.body.duration,
    });

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
    const activity = await activityService.updateActivity(activityId, {
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
      duration: req.body.duration,
      occupiedSeats: req.body.occupiedSeats,
    });

    if (!activity) {
      return res.status(404).json({
        message: "Мероприятие не найдено",
      });
    }

    res.json(activity);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить информацию о мероприятии",
    });
  }
};
