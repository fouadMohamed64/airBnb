import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
            listingId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Listings',
                        required: true
            },
            guestId: {
                        type: mongoose.SchemaTypes.ObjectId,
                        ref: 'User',
                        required: true
            },
            hostId: {
                        type: mongoose.SchemaTypes.ObjectId,
                        ref: 'User',
                        required: true
            },
            startDate: {
                        type: Date,
                        required: true
            },
            endDate: {
                        type: Date,
                        required: true
            },
            guests: {
                        type: Number,
                        required: true
            },
            status: {
                        type: String,
                        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
                        default: 'pending'
            },
            totalPrice: {
                        type: Number,
                        required: true
            }
}, { timestamps: true });


const Booking = mongoose.model('Booking', BookingSchema)

export default Booking;