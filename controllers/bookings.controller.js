import Booking from "../models/booking.model.js";
import { listingsModel } from "../models/listings.model.js";
export const createBooking = async (req, res) => {
    const newBooking = await Booking.create({
        ...req.body,
        totalPrice: calculateDays(req.body.startDate, req.body.endDate) * (await listingsModel.findById(req.body.listingId)).price
    });
    res.status(201).json({message: "Added Successfully", data: newBooking});
}

export const getBookingsForGuestId = async (req, res) => {
    const bookings = await Booking.find({ guestId: req.params.id })
        .populate('listingId', 'title _id')
        .populate('guestId', 'firstName lastName _id')
        .populate('hostId', 'firstName lastName _id');
    res.status(200).json({ message: "sucsses", data: bookings });
}

export const getAllBookings = async (req, res) => {
    const bookings = await Booking.find()
        .populate('listingId', 'title _id')
        .populate('guestId', 'firstName lastName _id')
        .populate('hostId', 'firstName lastName _id');
    res.status(200).json({ message: "sucsses", data: bookings });
}

export const getBookingById = async (req, res) => {
    const booking = await Booking.findById(req.params.id)
        .populate('listingId', 'title _id')
        .populate('guestId', 'firstName lastName _id')
        .populate('hostId', 'firstName lastName _id');
    res.status(200).json({ message: "sucsses", data: booking });
}

export const updateBooking = async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .populate('listingId', 'title _id')
        .populate('guestId', 'firstName lastName _id')
        .populate('hostId', 'firstName lastName _id');
    res.status(206).json({ message: "edited", data: booking });
}

export const deleteBooking = async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id)
    res.status(204).json({ message: "deleted" });
}
function calculateDays(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInMs = Math.abs(endDate - startDate);
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
}