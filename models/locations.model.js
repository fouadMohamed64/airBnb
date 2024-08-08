import mongoose from "mongoose";

const LocationSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    country: { type: String, require: true },
    latitude: { type: mongoose.Types.Decimal128, require: true },
    longitude: { type: mongoose.Types.Decimal128, require: true },
    listingCount: { type: Number, require: true },
  },
  { timestamps: true }
);

export const LocationModel = mongoose.model("Location", LocationSchema);
