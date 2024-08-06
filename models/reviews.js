const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema(
  {
    listingId: mongoose.SchemaTypes.ObjectId,
    userId: mongoose.SchemaTypes.ObjectId,
    rating: {
      enum: [1, 2, 3, 4, 5],
    },
    comment: String,
  },
  { timestamps: true }
);

const reviewsmodel = mongoose.model("Reviews", reviewsSchema);

module.exports = reviewsmodel;
