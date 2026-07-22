import { Types } from "mongoose";

export interface IActivity {
  user: Types.ObjectId;
  type: string;
  title: string;
  description: string;
  imageUrl: string;
  originalLanguage?: string;
  subtitlesLanguage?: string;
  date: string;
  time: string;
  free: boolean;
  price: number;
  duration: number;
  occupiedSeats: string[];
}

export interface CreateActivityRequestBody {
  type: string;
  title: string;
  description: string;
  imageUrl: string;
  originalLanguage?: string;
  subtitlesLanguage?: string;
  date: string;
  time: string;
  free?: boolean;
  price?: number;
  duration?: number;
}

export interface UpdateActivityRequestBody {
  type?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  originalLanguage?: string;
  subtitlesLanguage?: string;
  date?: string;
  time?: string;
  free?: boolean;
  price?: number;
  duration?: number;
  occupiedSeats?: string[];
}
