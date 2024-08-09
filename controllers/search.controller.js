import { listingsModel } from "../models/listings.model.js";

// Search function wrapped with error handling utility
export const search = async (req, res) => {
            // 1. Extract and Validate Query Parameters
            const {
                        location,
                        date_from = null,
                        date_to = null,
                        guests,
                        amenities,
                        price_min,
                        price_max,
                        property_type,
                        room_type,
                        bedrooms,
                        bathrooms,
                        min_rating,
                        sort,
                        page = 1,
                        limit = 10,
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

            if (bathrooms && isNaN(parseInt(bathrooms))) {
                        return res.status(400).json({ message: 'Invalid bathrooms parameter' });
            }

            if (min_rating && isNaN(parseFloat(min_rating))) {
                        return res.status(400).json({ message: 'Invalid min_rating parameter' });
            }

            if (price_min && price_max && parseInt(price_min) > parseInt(price_max)) {
                        return res.status(400).json({ message: 'price_min must be less than or equal to price_max' });
            }

            // 2. Build MongoDB Query Object
            const query = {};
            if (location) query.location = location;
            if (date_from && date_to) {
                        query.available_dates = {
                                    $gte: new Date(date_from),
                                    $lte: new Date(date_to),
                        };
            }
            if (amenities) query.amenities = { $in: amenities.split(',') };
            if (price_min) query.price = { $gte: parseInt(price_min) };
            if (price_max) query.price = { ...query.price, $lte: parseInt(price_max) };
            if (property_type) query.property_type = property_type;
            if (room_type) query.room_type = room_type;
            if (bedrooms) query.bedrooms = { $gte: parseInt(bedrooms) };
            if (bathrooms) query.bathrooms = { $gte: parseInt(bathrooms) };
            if (min_rating) query.avg_rating = { $gte: parseFloat(min_rating) };

            // 3. Prepare Sorting Options
            let sortOptions = {};
            if (sort === 'price_asc') sortOptions.price_per_night = 1;
            else if (sort === 'price_desc') sortOptions.price_per_night = -1;
            else if (sort === 'rating_desc') sortOptions.avg_rating = -1;

            // 4. Handle Pagination
            const pageNo = parseInt(page) || 1;
            const limitPerPage = parseInt(limit) || 10;
            const skip = (pageNo - 1) * limitPerPage;

            // 5. Execute Query and Fetch Listings
            const listings = await listingsModel.find(query)
                        .populate('hostId')
                        .sort(sortOptions)
                        .skip(skip)
                        .limit(limitPerPage)
                        .exec();

            // 6. Get Total Listings Count
            console.log(query);
            
            const totalListings = await listingsModel.countDocuments(query);

            // 7. Construct Response Object
            const response = {
                        listings,
                        pagination: {
                                    current_page: pageNo,
                                    total_pages: Math.ceil(totalListings / limitPerPage),
                                    total_listings: totalListings,
                                    has_next: (pageNo * limitPerPage) < totalListings,
                                    has_previous: pageNo > 1,
                        },
            };

            // 8. Send Response
            res.status(200).json(response);
};