const express = require("express");
const authController = require("../controller/auth-controller");
const { getAIRecommendation } = require('../controller/ai-controller');
const authMiddleware = require("../middleware/auth-middleware");
const Router = express.Router(); // Capital 'R'

//public routes
//1---for user registration controller brother------------------------
Router.post("/register", authController.register);
//2---for user login controller brother------------------------
Router.post("/login", authController.login);
//3---Verify OTP after registration
Router.post("/verify-otp", authController.verifyOTP);
//4---Promote user to admin (requires valid admin code)
Router.post("/promote-admin", authController.promoteToAdmin);
//5---Forgot Password
Router.post("/forgot-password", authController.forgotPassword);
//6---Reset Password
Router.post("/reset-password", authController.resetPassword);
//private routes (frontend  should remove token)
Router.post("/logout", authController.logout);
// Add this route (Protected by your existing authMiddleware)
// AI Route (Corrected to use Capital 'Router')
Router.post('/ai-recommend', authMiddleware.protect, getAIRecommendation);
//protected routes
//get current user details
Router.get("/me", authMiddleware.protect, authController.getMe);

//update current user details
//if updating password then current password must be provided
Router.patch("/updateMe", authMiddleware.protect, authController.updateMe);

//optional Example: Only admin can get all users
// Router.get(
//   "/allUsers",
//   authMiddleware.protect,
//   authMiddleware.restrictTo("admin"),
//   adminController.getAllUsers
// );

module.exports = Router;
