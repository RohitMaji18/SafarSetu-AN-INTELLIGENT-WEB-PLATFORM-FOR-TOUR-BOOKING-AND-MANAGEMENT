const express = require("express");
const adminController = require("../controller/admin-controller");
const { protect, restrictTo } = require("../middleware/auth-middleware");

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect, restrictTo("admin"));

// Dashboard statistics
router.get("/dashboard", adminController.getDashboardStats);

// User management
router.get("/users", adminController.getAllUsers);
router.patch("/users/:id/role", adminController.updateUserRole);
router.delete("/users/:id", adminController.deleteUser);

// Booking management
router.get("/bookings", adminController.getAllBookings);
router.patch("/bookings/:id/status", adminController.updateBookingStatus);
router.delete("/bookings/:id", adminController.deleteBooking);

module.exports = router;
