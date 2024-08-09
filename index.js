import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import listingRoutes from "./routes/listing.route.js";
import userRoutes from './routes/users.route.js';
import searchRoutes from './routes/search.router.js';

import errorHandler from "./utils/errorHandler.js";

// Load environment variables
dotenv.config();

const app = express();
const URL =
  process.env.MONGO_URL ||
  "mongodb+srv://teamfeammearn:IchwrnfkrNZ7Jark@cluster0.0xq8q.mongodb.net/AIRNBN?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(URL)
  .then(() => console.log("Connected to DB successfully"))
  .catch((err) => console.log("Failed to connect to DB:", err));
app.use(express.json());

// Error handling middleware
app.use(express.json());
app.use(errorHandler);

// Routes
app.use("/listing", listingRoutes);
app.use('/user', userRoutes)
app.use('/search', searchRoutes)


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});