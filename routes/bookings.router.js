import express from 'express'
import { createBooking, deleteBooking, updateBooking, getBookingById, getAllBookings, getBookingsForGuestId } from '../controllers/bookings.controller.js'
import { handleAsyncError } from '../utils/handleAsyncError.js'
import Authorize from '../Auth/authorization.js'
import Authenticate from '../Auth/authentication.js'
const Router = express.Router()

Router.post('/book', Authorize, Authenticate('guest','admin'), handleAsyncError(createBooking))
Router.get('/', Authorize, Authenticate('admin','guest'), handleAsyncError(getAllBookings))
Router.get('/guest/:id', Authorize, Authenticate('guest', 'admin'), handleAsyncError(getBookingsForGuestId))
Router.get('/:id', Authorize, Authenticate('admin'), handleAsyncError(getBookingById))
Router.put('/:id', Authorize, Authenticate('host', 'admin'), handleAsyncError(updateBooking))
Router.delete('/:id', Authorize, Authenticate('admin'), handleAsyncError(deleteBooking))


export default Router