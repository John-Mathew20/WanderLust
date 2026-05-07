const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

const wrapAsync = require("../utils/wrapAsync");

const passport = require("passport");
const { isLoggedIn, isOwner, validateListing } = require("../utils/middleware");

const listingController = require("../controllers/listing");

//index route
router.get("/", wrapAsync(listingController.index));

//new route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

// show route
router.get("/:id", wrapAsync(listingController.showListing));

//create route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createNewListing),
);

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

// update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing),
);

//delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing),
);

module.exports = router;
