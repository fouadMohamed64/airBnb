import { listingsModel } from '../models/listings.model.js';


export const getListings = async (req, res) => {
            const listings = await listingsModel.find({});
            res.status(200).json({ listings });
}

export const getListingById = async (req, res) => {
            const listing = await listingsModel.findById(req.params.listingId);
            if (!listing) {
                        return res.status(404).json({ error: 'Listing not found' });
            }
            res.status(201).json({ data: listing });
}

export const createListing = async (req, res) => {
            let newListing = req.body
            const listing = new listingsModel(newListing);
            await listing.save();
            res.status(201).json({msg:"added", data: listing } );
}

export const updateListing = async (req, res) => {
            const listing = await listingsModel.findByIdAndUpdate(req.params.listingId, req.body, { new: true });
            if (!listing) {
                        return res.status(404).json({ error: 'Listing not found' });
            }
            res.status(200).json({message:"update", data: listing });
}

export const deleteListing = async (req, res) => {
            const listing = await listingsModel.findByIdAndDelete(req.params.listingId);
            if (!listing) {
                        return res.status(404).json({ error: 'Listing not found' });
            }
            res.status(204).json({message: 'Listing deleted'});
}

