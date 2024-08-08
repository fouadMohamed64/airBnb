import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import listingRoutes from "./routes/listing.route.js";
import userRoutes from './routes/users.route.js'

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

// Routes
app.use("/listing", listingRoutes);
app.use('/user' , userRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
});
