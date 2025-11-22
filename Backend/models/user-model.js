const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the user schema of the travlystiq
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, //normal email
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false, // Exclude password from query results by default
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordChangedAt: Date,
  resetPasswordToken: String, // Token for password reset
  resetPasswordExpires: Date, // Token expiration time
  // this active field is for soft delete of user
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  // OTP and email verification fields
  otp: {
    type: String,
    default: null,
  },
  otpExpires: {
    type: Date,
    default: null,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

//middleware to update  'updatedAt' field before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
//method to hash the password before saving
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
