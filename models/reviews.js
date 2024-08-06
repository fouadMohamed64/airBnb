import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
  {
    listingId: {
      type: mongoose.SchemaTypes.ObjectId,
      require: true,
      ref: "Listing",
    },
    userId: { type: mongoose.SchemaTypes.ObjectId, require: true, ref: "User" },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    comment: { type: String, trim: true },
  },
  { timestamps: true }
);

export const reviewsmodel = mongoose.model("Reviews", reviewsSchema);
