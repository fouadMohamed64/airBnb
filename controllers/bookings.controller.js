import Booking from "../models/booking.model";

export const createBooking = async (req, res) => {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({message:"Added Successfully", data: newBooking });
}

export const getBookingsForGuestId = async (req, res) => {
    const bookings = await Booking.find({guestId: req.params.id});
    res.status(200).json({message:"sucsses", data: bookings });
}

export const getAllBookings = async (req, res) => {
    const bookings = await Booking.find();
    res.status(200).json({message:"sucsses", data: bookings });
}

export const getBookingById = async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json({message:"sucsses", data: booking });
}

export const updateBooking = async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(206).json({message:"edited", data: booking });
}

export const deleteBooking = async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id)
    res.status(204).json({ message: "deleted"});
}