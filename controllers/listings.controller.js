import { listingsModel } from "../models/listings.model";

export const getAllListings = async (req, res) => {
    try {
        const listings = await listingsModel.find();
        res.status(200).json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}