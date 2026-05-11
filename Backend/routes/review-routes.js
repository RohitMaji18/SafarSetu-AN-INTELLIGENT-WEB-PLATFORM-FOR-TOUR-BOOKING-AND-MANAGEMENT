const express = require("express");
const { getTourReviews, createReview, getAllReviews } = require("../controller/reviews-controller");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.route("/tours/:tourId/reviews").get(getTourReviews).post(authMiddleware.protect, createReview);
router.route("/reviews").get(getAllReviews);

module.exports = router;
