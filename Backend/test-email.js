// Simple test script to verify email sending via mailService
require("dotenv").config();
const { sendOTPEmail } = require("./utils/mailService");

(async () => {
  try {
    // Use configured recipient (Mailtrap captures all mail regardless of 'to')
    let to =
      process.env.EMAIL_TO || process.env.EMAIL_USER || process.env.MAIL_USER;
    // If configured user is not an email address (e.g. Mailtrap username), use a valid recipient
    if (!to || !to.includes("@")) {
      to = process.env.EMAIL_TO || "recipient@example.com";
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const name = "Test User";

    console.log(
      "Using SMTP host:",
      process.env.EMAIL_HOST ||
        process.env.MAIL_HOST ||
        process.env.MAIL_SERVICE
    );
    console.log("Sending test OTP to:", to);
    const result = await sendOTPEmail(to, otp, name);
    console.log("Result:", result);
    process.exit(0);
  } catch (err) {
    console.error("Test email error:", err);
    process.exit(1);
  }
})();
