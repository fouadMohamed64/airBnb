import moongose from "mongoose";

const listingsSchema = moongose.Schema({
    title:{
        type: String,   
        trim: true,
        required: true
    },
    address:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true
    },
    category:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category",
    },
    roomType:{
        type: String,
        trim: true
    },
    bedrooms:{
        type: Number,
        trim: true
    },
    bathrooms: {
        type: Number,
        trim: true
    },
    amenities: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'amenities'
    },
    price: {
        type: Number,
        trim: true
    },
    imagesURL: [String],
    hostId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    locationId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Location',
        required: true
    }
},{
    timestamps: true
});

export const listingsModel = moongose.model('Listings', listingsSchema)