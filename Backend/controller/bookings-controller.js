const BookTour = require("../models/booktour-model");

// Get all bookings for the current user
exports.getUserBookings = async (req, res) => {
  try {
    // Get user ID from authenticated request
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Not authenticated. Please log in.",
      });
    }

    // Find all bookings for this user
    const bookings = await BookTour.find({ user: userId }).sort({
      bookingDate: -1,
    });

    res.status(200).json({
      status: "success",
      results: bookings.length,
      data: { bookings },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    // Prefer authenticated user (if you have auth middleware), otherwise accept user from body
    const userId = req.user?.id || req.body.user || undefined;
    const { tour, bookingDate, numberOfPeople, totalPrice } = req.body;
    if (!tour || !numberOfPeople || typeof totalPrice === "undefined") {
      return res
        .status(400)
        .json({ status: "error", message: "Missing required booking fields" });
    }
    const bookingData = {
      tour,
      bookingDate: bookingDate || Date.now(),
      numberOfPeople,
      totalPrice,
    };
    // only attach user when available
    if (userId) bookingData.user = userId;
    // keep initial status as pending so admin can confirm later
    bookingData.status = "pending";
    const booking = await BookTour.create(bookingData);
    res.status(201).json({ status: "success", data: { booking } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
