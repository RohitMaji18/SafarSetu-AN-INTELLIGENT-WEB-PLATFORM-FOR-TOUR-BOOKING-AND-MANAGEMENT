const Review = require("../models/review-model");
const Tour = require("../models/tours-model");
const tours = require("../data/tours-data");

exports.getTourReviews = async (req, res) => {
  try {
    const { tourId } = req.params;
    const tourIdNum = parseInt(tourId);
    const dbReviews = await Review.find({ tour: tourIdNum }).sort({ createdAt: -1 });

    // Find hardcoded reviews for this tour
    const tourData = tours.find(t => t._id == tourIdNum);
    const hardcodedReviews = tourData?.reviews || [];

    // Combine and sort all reviews by createdAt descending
    const allReviews = [...dbReviews, ...hardcodedReviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    res.status(200).json({
      status: "success",
      results: allReviews.length,
      data: {
        reviews: allReviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    // Get all DB reviews
    const dbReviews = await Review.find().sort({ createdAt: -1 }).limit(10); // Limit to recent 10 for landing page

    // Get hardcoded reviews from all tours
    const hardcodedReviews = [];
    tours.forEach(tour => {
      if (tour.reviews) {
        hardcodedReviews.push(...tour.reviews);
      }
    });

    // Combine and sort all reviews by createdAt descending, limit to 10
    const allReviews = [...dbReviews, ...hardcodedReviews]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    res.status(200).json({
      status: "success",
      results: allReviews.length,
      data: {
        reviews: allReviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { tourId } = req.params;
    const tourIdNum = parseInt(tourId);
    const { rating, comment, photo } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({
        status: "error",
        message: "Please provide both rating and comment.",
      });
    }

    const tour = await Tour.findOne({ _id: tourIdNum });
    if (!tour) {
      return res.status(404).json({
        status: "error",
        message: "Tour not found.",
      });
    }

    const review = await Review.create({
      tour: tourIdNum,
      user: req.user._id,
      name: req.user.name || req.user.email || "Guest Traveler",
      rating,
      comment,
      photo,
    });

    res.status(201).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
