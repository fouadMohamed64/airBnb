import mongoose from "mongoose";

const availableDateSchema = new mongoose.Schema({
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
}, { _id: false });

const listingsSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category",
    },
    roomType: {
        type: String,
        trim: true
    },
    bedrooms: {
        type: Number,
        trim: true
    },
    bathrooms: {
        type: Number,
        trim: true
    },
    guests: {
        type: Number,
        required: true
},
    amenities: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'amenities'
    },
    reviews: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Review'
    },
    price: {
        type: Number,
        trim: true
    },
    imagesURL: [String],
    hostId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    locationId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Location',
        required: true
    },
    available_dates: [availableDateSchema]
}, {
    timestamps: true
});

export const listingsModel = mongoose.model('Listings', listingsSchema)