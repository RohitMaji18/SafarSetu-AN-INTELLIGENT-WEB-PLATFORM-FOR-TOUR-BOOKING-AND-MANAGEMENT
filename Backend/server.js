require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const connectDB = require("./config/db");
const UserModel = require("./models/user-model");
const Tour = require("./models/tours-model");
const toursSeedData = require("./data/tours-data.js");
const homeRoutes = require("./routes/home-routes");
const userRoutes = require("./routes/user-routes");
const tourRoutes = require("./routes/tour-routes");
const bookingsRoutes = require("./routes/bookings-routes");
const paymentRoutes = require("./routes/payment-routes");
const adminRoutes = require("./routes/admin-routes");
const reviewRoutes = require("./routes/review-routes");

//
const cors = require("cors");

// Initialize Express
const app = express();
// Middleware
app.use(cors());
app.use(express.json());

//static files
app.use(express.static("public"));

//all routes
app.use("/api/v1", homeRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1", tourRoutes);
app.use("/api/v1", bookingsRoutes);
app.use("/api/v1", reviewRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1/admin", adminRoutes);

const seedTours = async () => {
  try {
    for (const tour of toursSeedData) {
      await Tour.replaceOne(
        { _id: tour._id },
        tour,
        { upsert: true }
      );
    }

    console.log(`Seeded/updated ${toursSeedData.length} tours in the database.`);
  } catch (error) {
    console.error("Tour seeding failed:", error);
  }
};

const startServer = async () => {
  await connectDB();
  await seedTours();
  const Port = 3000;
  app.listen(Port, () => {
    console.log(`server is running on port-> ${Port}`);
  });
};

startServer();
