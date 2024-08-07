import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

<<<<<<< HEAD
import listingRoutes from './routes/listing.route.js';

=======
import {listingRoutes} from './routes/listings.router.js';
import { bookingsRoutes } from './routes/bookings.router.js';
>>>>>>> cc5cbab0a4c02dccee39debd638de70fdeee95d6
// Load environment variables
dotenv.config();


const app = express();
const URL = process.env.MONGO_URL || 'mongodb+srv://teamfeammearn:IchwrnfkrNZ7Jark@cluster0.0xq8q.mongodb.net/AIRNBN?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(URL)
            .then(() => console.log('Connected to DB successfully'))
            .catch(err => console.log('Failed to connect to DB:', err));
app.use(express.json());


// Routes
<<<<<<< HEAD
app.use('/listing', listingRoutes);
=======
app.use('/listings', listingRoutes);
app.use('/bookings', bookingsRoutes);
>>>>>>> cc5cbab0a4c02dccee39debd638de70fdeee95d6

// Error handling middleware
app.use((err, req, res, next) => {
            res.status(err.status || 500).json({
                        message: err.message || 'Internal Server Error',
            });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
});