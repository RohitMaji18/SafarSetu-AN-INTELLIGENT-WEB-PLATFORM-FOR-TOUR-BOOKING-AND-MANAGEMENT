const userModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOTPEmail } = require("../utils/mailService");

//helper function to generate sign JWT token--
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  });
};

//helper function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

//1---for user registration controller - send OTP to email------------------------
exports.register = async (req, res) => {
  try {
    //import the data from req body;
    const { name, email, password, confirmPassword, adminCode } = req.body;

    //validate the data
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    //check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser && existingUser.isEmailVerified) {
      return res.status(400).json({ message: "User already exists" });
    }

    // If unverified user exists, delete it to start fresh
    if (existingUser && !existingUser.isEmailVerified) {
      await userModel.deleteOne({ email });
    }

    //hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10); //10 is the salt rounds

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Check if admin code is provided and valid
    let userRole = "user";
    if (adminCode && adminCode === process.env.ADMIN_REGISTRATION_CODE) {
      userRole = "admin";
    }

    //create a new user with unverified status
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
      isEmailVerified: false,
      role: userRole,
    });
    //save the user on the database
    await newUser.save();

    // Send OTP email
    const emailResult = await sendOTPEmail(email, otp, name);
    if (!emailResult.success) {
      await userModel.deleteOne({ email });
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    //send the response to the client
    res.status(201).json({
      message:
        "OTP sent to your email. Please verify your email to complete registration.",
      email,
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error during your registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Verify OTP and complete registration------------------------
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Find user with matching email and OTP
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP has expired
    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Mark email as verified and clear OTP
    user.isEmailVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Generate JWT token
    const token = signToken(user._id);

    res.status(200).json({
      message: "Email verified successfully. Registration complete!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//login controller---------------------------------------
//for user login brother
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate the data
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    //check if the user + password exists
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //check the password is correct
    const is_match = await user.correctPassword(password, user.password);
    if (!is_match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //generate a JWT token for the user ;
    const token = signToken(user._id);
    //send the response to the client

    res.status(200).json({
      message: "Login successful buddy",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);

    res.status(500).json({ message: "Server error" });
  }
};

//logut user controller--------------------------
//note:JWT token cannot be destroyed from the server side because JWT is stateless.
//but we can delete it from the client side by simply deleting the token from the local storage or cookie
//frontwend will handle the logout functionality by deleting the token from the local storage or cookie
exports.logout = (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};

//for get me route ;
exports.getMe = async (req, res) => {
  try {
    // req.user is set in the authMiddleware after verifying the JWT token
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//for update me controller-------------------------
exports.updateMe = async (req, res) => {
  try {
    const { name, email, password, currentPassword, photo } = req.body;
    const updates = {}; //object to hold the fields to be updated
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (photo) updates.photo = photo;

    // If the user wants to update the password, ensure they provide the current password
    if (password) {
      if (!currentPassword) {
        return res.status(400).json({
          message: "Current password is required to set new password",
        });
      }

      const user = await userModel.findById(req.user.id).select("+password");
      const is_match = await user.correctPassword(
        currentPassword,
        user.password
      );

      if (!is_match) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect Dost" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    updates.updatedAt = Date.now();

    // Update the user document in the database
    const updatedUser = await userModel
      .findByIdAndUpdate(req.user.id, updates, {
        new: true,
        runValidators: true,
      })
      .select("-password");

    res.status(200).json({
      message: "User data updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Promote user to admin - accessible to super admins only
exports.promoteToAdmin = async (req, res) => {
  try {
    const { email, adminCode } = req.body;

    if (!email || !adminCode) {
      return res
        .status(400)
        .json({ message: "Email and admin code are required" });
    }

    // Verify admin code
    if (adminCode !== process.env.ADMIN_REGISTRATION_CODE) {
      return res.status(401).json({ message: "Invalid admin code" });
    }

    // Find and update user to admin role
    const user = await userModel
      .findOneAndUpdate(
        { email },
        { role: "admin", updatedAt: Date.now() },
        { new: true }
      )
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User promoted to admin successfully",
      user,
    });
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};
