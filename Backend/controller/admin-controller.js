const userModel = require("../models/user-model");
const BookTour = require("../models/booktour-model");
const TourModel = require("../models/tours-model");

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json({
      status: "success",
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete user by ID (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Update user role (admin only)
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid role. Must be 'user' or 'admin'",
      });
    }

    const user = await userModel
      .findByIdAndUpdate(id, { role }, { new: true, runValidators: true })
      .select("-password");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User role updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get all bookings (admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await BookTour.find()
      .populate("user", "name email")
      .populate("tour", "title price");

    res.status(200).json({
      status: "success",
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete booking (admin only)
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await BookTour.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Booking deleted successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Update booking status (admin only)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({
        status: "error",
        message:
          "Invalid status. Must be 'pending', 'confirmed', or 'cancelled'",
      });
    }

    const booking = await BookTour.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("user", "name email")
      .populate("tour", "title price");

    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Booking status updated successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get dashboard statistics (admin only)
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalBookings = await BookTour.countDocuments();
    const totalTours = await TourModel.countDocuments();
    const totalRevenue = await BookTour.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]);

    const recentBookings = await BookTour.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email")
      .populate("tour", "title price");

    res.status(200).json({
      status: "success",
      data: {
        totalUsers,
        totalBookings,
        totalTours,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentBookings,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
