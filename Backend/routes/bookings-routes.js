const express = require("express");
const bookingsController = require("../controller/bookings-controller");
const { protect } = require("../middleware/auth-middleware");

const router = express.Router();

router.route("/bookings").post(bookingsController.createBooking);
router
  .route("/bookings/my-bookings")
  .get(protect, bookingsController.getUserBookings);

module.exports = router;
