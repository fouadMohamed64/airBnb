import express from "express";
import {
  createListing,
  deleteListing,
  getListingById,
  getListings,
  updateListing
} from "../controllers/listing.controller.js";
import {
  addReviewsByListingId,
  getReviewsByListingId,
} from "../controllers/reviews.controller.js";

import { addMessagesByListingId, getMessagesByListingId } from "../controllers/messages.controller.js";
import { handleAsyncError } from '../utils/handleAsyncError.js';

import { authentication } from '../middleware/Authentication.js';
import { authorization } from '../middleware/Authorization.js';
// import {
//   getMessagesByListingId,
//   addMessagesByListingId,
// } from "../controllers/messages.controller.js";

import { payment
 } from "../controllers/payment.controller.js";


// import { handleAsyncError } from "../utils/errorHandler.js";

let router = express.Router();

router.route("/")
  .get(handleAsyncError(getListings)) // get all listings
  .post(authentication,authorization('admin'),handleAsyncError(createListing)); // post a new listing

router.route("/:listingId")
  .get(handleAsyncError(getListingById)) // get a listing by id
  .put(authentication,authorization('admin'),handleAsyncError(updateListing)) // update a listing by id
  .delete(handleAsyncError(deleteListing)); // delete a listing by id


router
  .route("/:listingId/reviews")
  .get(getReviewsByListingId)
  .post(addReviewsByListingId);

router
  .route("/:listingId/messages")
  .get(getMessagesByListingId)
  .post(addMessagesByListingId);

  router.post('/:listingId/payment',authentication,authorization("guest"),payment);

export default router;
