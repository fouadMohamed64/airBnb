import mongoose from "mongoose";

const locationSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    country: { type: String, require: true },
    latitude: { type: mongoose.Types.Decimal128, require: true },
    longitude: { type: mongoose.Types.Decimal128, require: true },
    listingCount: { type: Number, require: true },
  },
  { timestamps: true }
);

export const locationModel = mongoose.model("Location", locationSchema);
