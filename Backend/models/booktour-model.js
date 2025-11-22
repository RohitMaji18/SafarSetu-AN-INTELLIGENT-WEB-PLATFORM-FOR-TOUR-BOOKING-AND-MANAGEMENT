const mongoose = require("mongoose");

// Note: Tour documents use a numeric _id in this project (see tours-model.js),
// so store the `tour` field as Number to match. `user` is optional here so
// bookings can be created from the frontend even when the user isn't
// authenticated; ideally you'd require authentication and use req.user.
const bookTourSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  tour: {
    // Tour._id is Number in tours-model.js, so use Number here to avoid
    // ObjectId casting errors when frontend sends numeric ids like 1001.
    type: Number,
    ref: "Tour",
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  numberOfPeople: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("BookTour", bookTourSchema);
