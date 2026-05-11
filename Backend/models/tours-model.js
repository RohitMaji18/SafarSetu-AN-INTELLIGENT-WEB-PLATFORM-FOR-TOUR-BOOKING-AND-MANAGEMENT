const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema(
  {
    _id: Number,

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    
    // --- NEW: State for Filtering ---
    state: {
      type: String,
      required: true, // e.g., "Rajasthan", "Himachal"
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },
    
    duration: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    // --- NEW: Difficulty & Group Size Meta ---
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Hard"],
      default: "Moderate",
    },

    groupSize: {
      type: Number,
      required: true,
    },

    // --- NEW: Eco-Friendly Score ---
    ecoScore: {
      type: Number,
      min: 1,
      max: 10,
      default: 7,
    },

    // --- NEW: Inclusions (Icons logic) ---
    inclusions: {
      hasFlight: { type: Boolean, default: false },
      hasFood: { type: Boolean, default: true },
      hasHotel: { type: Boolean, default: false },
      hasGuide: { type: Boolean, default: true },
      hasTransport: { type: Boolean, default: true },
    },

    // --- User-selectable start dates ---
    availableDates: [
      {
        type: Date,
      },
    ],

    image: [{ type: String, required: true }],

    rating: {
      type: Number,
      default: 0,
    },

    highlights: [
      {
        type: String,
      },
    ],

    // --- Optional adventure stats for tour analytics ---
    experienceStats: {
      adventure: { type: Number, min: 0, max: 10, default: 5 },
      relaxation: { type: Number, min: 0, max: 10, default: 5 },
      nature: { type: Number, min: 0, max: 10, default: 5 },
      culture: { type: Number, min: 0, max: 10, default: 5 },
    },

    faqs: [
      {
        question: String,
        answer: String,
      },
    ],

    // --- NEW: Guide Details ---
    guide: {
      name: { type: String, default: "Pro Guide" },
      experience: { type: String, default: "5+ Years" },
      photo: { type: String }
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

TourSchema.index({ state: 1, difficulty: 1, price: 1, duration: 1 });

const TourModel = mongoose.model("Tour", TourSchema);
module.exports = TourModel;