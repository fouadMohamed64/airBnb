import { listingsModel } from '../models/listings.model.js';


export const getListings = async (req, res) => {
            const listings = await listingsModel.find({})
                        .populate('hostId', 'firstName lastName _id');
            res.status(200).json({ listings });
}

export const getListingById = async (req, res) => {
            const listing = await listingsModel.findById(req.params.listingId)
                        .populate('hostId', 'firstName lastName _id');;
            if (!listing) {
                        return res.status(404).json({ error: 'Listing not found' });
            }
            res.status(201).json({ data: listing });
}

export const createListing = async (req, res) => {
            let newListing = req.body
            const listing = new listingsModel(newListing);
            await listing.save();
            await listing.populate('hostId', 'firstName lastName _id')
            res.status(201).json({msg:"added", data: listing } );
}

export const updateListing = async (req, res) => {
            const listing = await listingsModel.findByIdAndUpdate(req.params.listingId, req.body, { new: true })
                        .populate('hostId', 'firstName lastName _id');;
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
            res.status(204);
}

export const search = async (req, res) => {
            // Extract and Validate Query Parameters
            const {
                        address,
                        date_from = null,
                        date_to = null,
                        guests,
                        price_min,
                        price_max,
                        roomType,
                        bedrooms,
                        sort,
            } = req.query;

            // Validate data types and ranges
            if (guests && isNaN(parseInt(guests))) {
                        return res.status(400).json({ message: 'Invalid guests parameter' });
            }

            if (price_min && isNaN(parseInt(price_min))) {
                        return res.status(400).json({ message: 'Invalid price_min parameter' });
            }

            if (price_max && isNaN(parseInt(price_max))) {
                        return res.status(400).json({ message: 'Invalid price_max parameter' });
            }

            if (bedrooms && isNaN(parseInt(bedrooms))) {
                        return res.status(400).json({ message: 'Invalid bedrooms parameter' });
            }

            if (price_min && price_max && parseInt(price_min) > parseInt(price_max)) {
                        return res.status(400).json({ message: 'price_min must be less than or equal to price_max' });
            }

            // Build MongoDB Query Object
            const query = {};
            if (address) query.address = address;
            if (date_from && date_to) {
                        query.available_dates = {
                                    $gte: new Date(date_from),
                                    $lte: new Date(date_to),
                        };
            }
            if (price_min) query.price = { $gte: parseInt(price_min) };
            if (price_max) query.price = { ...query.price, $lte: parseInt(price_max) };
            if (roomType) query.roomType = roomType;
            if (bedrooms) query.bedrooms = { $gte: parseInt(bedrooms) };

            let sortOptions = {};
            if (sort === 'price_asc') sortOptions.price = 1;
            else if (sort === 'price_desc') sortOptions.price = -1;


            const listings = await listingsModel.find(query)
                        .sort(sortOptions)
                        .exec();
            res.status(200).json({"items": listings});
};

