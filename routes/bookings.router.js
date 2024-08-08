import express from 'express'
import { createBooking } from '../controllers/bookings.controller.js'
import { handleAsyncError } from '../utils/errorHandler.js'
import Authorize from '../Auth/authorization.js'
import Authenticate from '../Auth/authentication.js'
export const bookingsRoutes = express.Router()

bookingsRoutes.post('/book', Authorize, Authenticate('guest') , handleAsyncError(createBooking))