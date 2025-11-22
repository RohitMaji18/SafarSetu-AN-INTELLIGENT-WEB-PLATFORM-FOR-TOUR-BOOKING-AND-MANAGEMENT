const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const BookTour = require("../models/booktour-model");
const UserModel = require("../models/user-model");
const TourModel = require("../models/tours-model");
const { sendBookingConfirmationEmail } = require("../utils/mailService");

// Create a Stripe checkout session
exports.createCheckoutSession = async (req, res) => {
  try {
    const { tour, tourTitle, numberOfPeople, totalPrice, tourId, bookingDate } =
      req.body;

    if (!tourId || !numberOfPeople || typeof totalPrice === "undefined") {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields: tourId, numberOfPeople, totalPrice",
      });
    }

    // Convert price to cents (Stripe uses cents for INR)
    const priceInCents = Math.round(totalPrice * 100);

    // Create line item for the tour booking
    const lineItems = [
      {
        price_data: {
          currency: "inr", // Using INR currency
          product_data: {
            name: tourTitle || `Tour Booking`,
            description: `Booking for ${numberOfPeople} person(s)`,
            metadata: {
              tourId: tourId,
              numberOfPeople: numberOfPeople,
            },
          },
          unit_amount: priceInCents,
        },
        quantity: 1,
      },
    ];

    // Create checkout session with metadata to store booking info
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/tours/${tourId}`,
      metadata: {
        tourId: String(tourId),
        numberOfPeople: String(numberOfPeople),
        bookingDate: bookingDate || new Date().toISOString(),
        totalPrice: String(totalPrice),
        userId: req.user?.id || "guest",
      },
    });

    res.status(200).json({
      status: "success",
      sessionId: session.id,
      sessionUrl: session.url,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Create a booking after successful payment
exports.createBookingAfterPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const userId = req.user?.id;

    if (!sessionId) {
      return res.status(400).json({
        status: "error",
        message: "Session ID is required",
      });
    }

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Not authenticated",
      });
    }

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        status: "error",
        message: "Payment not completed",
      });
    }

    // Extract booking data from session metadata
    const { tourId, numberOfPeople, bookingDate, totalPrice } =
      session.metadata;

    // Create booking in database
    const booking = await BookTour.create({
      user: userId,
      tour: parseInt(tourId),
      bookingDate: bookingDate || new Date(),
      numberOfPeople: parseInt(numberOfPeople),
      totalPrice: parseFloat(totalPrice),
      status: "confirmed",
    });

    // Get user details for email
    const user = await UserModel.findById(userId);
    const tour = await TourModel.findOne({ _id: parseInt(tourId) });

    // Send booking confirmation email
    if (user && tour) {
      await sendBookingConfirmationEmail(user.email, user.name, {
        tourTitle: tour.title,
        tourDescription: tour.description,
        bookingDate: bookingDate,
        numberOfPeople: parseInt(numberOfPeople),
        totalPrice: parseFloat(totalPrice),
        duration: tour.duration,
        highlights: tour.highlights,
      });
    }

    res.status(201).json({
      status: "success",
      data: { booking },
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Handle webhook from Stripe (optional, for confirming payments)
exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // Here you can create the booking in your database
    console.log("Payment successful for session:", session.id);
    // TODO: Create BookTour entry with status "confirmed"
  }

  res.status(200).json({ received: true });
};
