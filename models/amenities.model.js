import mongoose from "mongoose";

const amenitiesSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    icon: {
        type: String
    },
    description: {
        type: String,
        trim: true
    }
})

export const Amenities = mongoose.model('Amenities', amenitiesSchema);