const mongoose = require("mongoose");

const locationSchema = mongoose.Schema(
  {
    name: String,
    country: String,
    latitude: mongoose.Types.Decimal128,
    longitude: mongoose.Types.Decimal128,
    listingCount: Number,
  },
  { timestamps: true }
);

const locationModel = mongoose.model("Location", locationSchema);

module.exports = locationModel;
