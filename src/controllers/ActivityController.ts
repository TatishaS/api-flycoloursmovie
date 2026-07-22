import { Request, Response } from "express";

import * as activityService from "../services/activityService";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/AppError";
import {
  CreateActivityRequestBody,
  UpdateActivityRequestBody,
} from "../types/activity.types";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const activities = await activityService.getAllActivities();
  res.json(activities);
});

export const getItem = asyncHandler<{ id: string }>(async (req, res) => {
  const activityId = req.params.id;
  const activity = await activityService.getActivityById(activityId);
  res.json(activity);
});

export const remove = asyncHandler<{ id: string }>(async (req, res) => {
  const activityId = req.params.id;
  const activity = await activityService.deleteActivity(activityId);

  if (!activity) {
    throw new AppError(404, "Activity not found");
  }

  res.json({
    success: true,
  });
});

export const create = asyncHandler<
  Record<string, never>,
  unknown,
  CreateActivityRequestBody
>(async (req, res) => {
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

export const update = asyncHandler<
  { id: string },
  unknown,
  UpdateActivityRequestBody
>(async (req, res) => {
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
