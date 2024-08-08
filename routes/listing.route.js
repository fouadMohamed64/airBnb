import express from "express";
import {
  createListing,
  deleteListing,
  getListingById,
  getListings,
  updateListing,
} from "../controllers/listing.controller.js";
import {
  getReviewsByListingId,
  addReviewsByListingId,
} from "../controllers/reviews.controller.js";

import {
  getMessagesByListingId,
  addMessagesByListingId,
} from "../controllers/messages.controller.js";
import { handleAsyncError } from "../utils/errorHandler.js";

let router = express.Router();

router
  .route("/")
  .get(handleAsyncError(getListings)) // get all listings
  .post(handleAsyncError(createListing)); // post a new listing

router
  .route("/:listingId")
  .get(handleAsyncError(getListingById)) // get a listing by id
  .put(handleAsyncError(updateListing)) // update a listing by id
  .delete(handleAsyncError(deleteListing)); // delete a listing by id

router
  .route("/:listingId/reviews")
  .get(getReviewsByListingId)
  .post(addReviewsByListingId);

router
  .route("/:listingId/messages")
  .get(getMessagesByListingId)
  .post(addMessagesByListingId);

export default router;
