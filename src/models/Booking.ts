import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seats: {
      type: Array,
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
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
