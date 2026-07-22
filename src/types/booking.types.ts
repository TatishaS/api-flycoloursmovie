import { Types } from "mongoose";

export interface IBooking {
  user: Types.ObjectId;
  seats: string[];
  activity: Types.ObjectId;
  activityDate: string;
  reservationNumber: string;
}
