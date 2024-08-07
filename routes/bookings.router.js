import express from 'express'
import { createBooking } from '../controllers/bookings.controller.js'
export const bookingsRoutes = express.Router()

bookingsRoutes.post('/book', createBooking)