import express from 'express'
import { getAllListings } from '../controllers/listings.controller.js'

export const listingRoutes = express.Router();

listingRoutes.get('/listings', getAllListings)