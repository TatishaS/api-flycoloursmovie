import { Request, Response } from "express";

import * as activityService from "../services/activityService";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/AppError";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const activities = await activityService.getAllActivities();
  res.json(activities);
});

export const getItem = asyncHandler(async (req: Request, res: Response) => {
  const activityId = req.params.id;
  const activity = await activityService.getActivityById(activityId);
  res.json(activity);
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const activityId = req.params.id;
  const activity = await activityService.deleteActivity(activityId);

  if (!activity) {
    throw new AppError(404, "Activity not found");
  }

  res.json({
    success: true,
  });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
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
});

export const update = asyncHandler(async (req: Request, res: Response) => {
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
    throw new AppError(404, "Activity not found");
  }

  res.json(activity);
});
