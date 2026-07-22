import BookingModel from "../models/Booking";

export const getAllBookings = async () => {
  return BookingModel.find().populate(["user", "activity"]).exec();
};

export const getBookingById = async (bookingId: string) => {
  return BookingModel.findById(bookingId).exec();
};

export const createBooking = async (data: {
  userId: string;
  seats: string[];
  activity: string;
  activityDate: string;
}) => {
  const reservationsNum = await BookingModel.countDocuments();
  const reservationNumber = String(reservationsNum + 1);

  const bookingDoc = new BookingModel({
    user: data.userId,
    seats: data.seats,
    activity: data.activity,
    activityDate: data.activityDate,
    reservationNumber,
  });

  return bookingDoc.save();
};

export const updateBooking = async (
  bookingId: string,
  data: { seats?: string[]; activity?: string; activityDate?: string },
) => {
  return BookingModel.findOneAndUpdate(
    { _id: bookingId },
    {
      seats: data.seats,
      activity: data.activity,
      activityDate: data.activityDate,
    },
    { new: true },
  ).exec();
};

export const deleteBooking = async (bookingId: string) => {
  return BookingModel.findOneAndDelete({ _id: bookingId }).exec();
};
