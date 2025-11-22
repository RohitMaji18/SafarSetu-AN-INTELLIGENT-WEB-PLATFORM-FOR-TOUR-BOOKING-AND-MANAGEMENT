const express = require("express");
const paymentController = require("../controller/payment-controller");
const { protect } = require("../middleware/auth-middleware");

const router = express.Router();

// Create a Stripe checkout session
router
  .route("/create-checkout-session")
  .post(protect, paymentController.createCheckoutSession);

// Create booking after payment is successful (requires auth)
router
  .route("/create-booking-after-payment")
  .post(protect, paymentController.createBookingAfterPayment);

// Stripe webhook (for confirming payments)
// NOTE: This route should NOT use bodyParser.json() - use raw body
// In server.js, configure webhook route separately
router.route("/webhook").post(paymentController.handleStripeWebhook);

module.exports = router;
