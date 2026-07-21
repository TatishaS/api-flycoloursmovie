import ActivityModel from "../models/Activity";

export const getAllActivities = async () => {
  return ActivityModel.find().populate("user").exec();
};

export const getActivityById = async (activityId: string) => {
  return ActivityModel.findById(activityId).exec();
};

export const createActivity = async (data: {
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  type: string;
  originalLanguage?: string;
  subtitlesLanguage?: string;
  date: string;
  time: string;
  free?: boolean;
  price?: number;
  duration?: number;
}) => {
  const activityDoc = new ActivityModel({
    user: data.userId,
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl,
    type: data.type,
    originalLanguage: data.originalLanguage,
    subtitlesLanguage: data.subtitlesLanguage,
    date: data.date,
    time: data.time,
    free: data.free,
    price: data.price,
    duration: data.duration,
  });

  return activityDoc.save();
};

export const updateActivity = async (
  activityId: string,
  data: {
    title?: string;
    description?: string;
    imageUrl?: string;
    type?: string;
    originalLanguage?: string;
    subtitlesLanguage?: string;
    date?: string;
    time?: string;
    free?: boolean;
    price?: number;
    duration?: number;
    occupiedSeats?: string[];
  },
) => {
  return ActivityModel.findOneAndUpdate(
    { _id: activityId },
    {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      type: data.type,
      originalLanguage: data.originalLanguage,
      subtitlesLanguage: data.subtitlesLanguage,
      date: data.date,
      time: data.time,
      free: data.free,
      price: data.price,
      duration: data.duration,
      occupiedSeats: data.occupiedSeats,
    },
    { new: true },
  ).exec();
};

export const deleteActivity = async (activityId: string) => {
  return ActivityModel.findOneAndDelete({ _id: activityId }).exec();
};
