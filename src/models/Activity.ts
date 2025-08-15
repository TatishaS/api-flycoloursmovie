import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    originalLanguage: {
      type: String,
    },
    subtitlesLanguage: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    free: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    occupiedSeats: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", ActivitySchema);
