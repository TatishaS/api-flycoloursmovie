import { Types } from "mongoose";

export interface IBooking {
  user: Types.ObjectId;
  seats: string[];
  activity: Types.ObjectId;
  activityDate: string;
  reservationNumber: string;
}

export interface CreateBookingRequestBody {
  seats: string[];
  activity: string;
  activityDate: string;
}

export interface UpdateBookingRequestBody {
  seats?: string[];
  activity?: string;
  activityDate?: string;
}
