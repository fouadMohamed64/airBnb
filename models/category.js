import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
            id: {
                        type: String,
                        required: true,
                        unique: true 
            },
            name: {
                        type: String,
                        required: true
            },
            description: {
                        type: String 
            },
            icon: {
                        type: String 
            },
            listingCount: {
                        type: Number,
                        default: 0 
            }
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;