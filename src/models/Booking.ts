import mongoose from "mongoose";
import { IBooking } from "../types/booking.types";

const BookingSchema = new mongoose.Schema<IBooking>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seats: {
      type: [String],
      required: true,
    },
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },
    activityDate: {
      type: String,
      required: true,
    },
    reservationNumber: {
      type: String,
      required: true,
      default: "0",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", BookingSchema);
