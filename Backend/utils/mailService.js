const nodemailer = require("nodemailer");

// Create transporter for sending emails
// You can configure this with Gmail, SendGrid, or any SMTP service
// Create transporter for sending emails
// Prefer explicit SMTP config (EMAIL_HOST) for services like Mailtrap
let transporterConfig;
// Priority: MAIL_HOST / MAIL_USER / MAIL_PASSWORD (user requested) -> EMAIL_* -> MAIL_SERVICE
if (process.env.MAIL_HOST) {
  transporterConfig = {
    host: process.env.MAIL_HOST,
    port: parseInt(
      process.env.MAIL_PORT || process.env.EMAIL_PORT || "587",
      10
    ),
    secure: (process.env.MAIL_PORT || process.env.EMAIL_PORT) == "465",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  };
} else if (process.env.EMAIL_HOST) {
  transporterConfig = {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587", 10),
    secure: process.env.EMAIL_PORT == 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  };
} else if (process.env.MAIL_SERVICE) {
  transporterConfig = {
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  };
} else {
  // Last fallback: look for MAIL_USER/MAIL_PASSWORD and assume Gmail service
  transporterConfig = {
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER || process.env.EMAIL_USER,
      pass: process.env.MAIL_PASSWORD || process.env.EMAIL_PASSWORD,
    },
  };
}

const transporter = nodemailer.createTransport(transporterConfig);

// Send OTP email for verification or reset password
exports.sendOTPEmail = async (email, otpOrUrl, name, type = 'otp') => {
  try {
    let subject, html;

    if (type === 'reset') {
      subject = "Password Reset - Travlystiq";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
            <h2 style="color: #333; text-align: center;">Travlystiq - Password Reset</h2>
            <p style="color: #666; font-size: 16px;">Hello <strong>${name}</strong>,</p>
            <p style="color: #666; font-size: 16px;">
              You requested a password reset for your Travlystiq account. Click the button below to reset your password:
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${otpOrUrl}" style="background-color: #ff9500; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reset Password
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              This link will expire in 10 minutes. If you did not request a password reset, please ignore this email.
            </p>
            <p style="color: #666; font-size: 14px;">
              For security reasons, do not share this email with anyone.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              Travlystiq Travel &copy; 2025. All rights reserved.
            </p>
          </div>
        </div>
      `;
    } else {
      subject = "Email Verification - Travlystiq OTP";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
            <h2 style="color: #333; text-align: center;">Travlystiq - Email Verification</h2>
            <p style="color: #666; font-size: 16px;">Hello <strong>${name}</strong>,</p>
            <p style="color: #666; font-size: 16px;">
              Welcome to Travlystiq! To complete your registration, please use the OTP below:
            </p>
            <div style="background-color: #ff9500; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
              <p style="font-size: 32px; font-weight: bold; color: white; margin: 0; letter-spacing: 2px;">
                ${otpOrUrl}
              </p>
            </div>
            <p style="color: #666; font-size: 14px;">
              This OTP will expire in 10 minutes. Do not share this OTP with anyone.
            </p>
            <p style="color: #666; font-size: 14px;">
              If you did not sign up for Travlystiq, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              Travlystiq Travel &copy; 2025. All rights reserved.
            </p>
          </div>
        </div>
      `;
    }

    const mailOptions = {
      from: "kishan kumawat",
      to: email,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: `${type === 'reset' ? 'Reset email' : 'OTP'} sent successfully` };
  } catch (error) {
    console.error(`Error sending ${type === 'reset' ? 'reset' : 'OTP'} email:`, error);
    return { success: false, message: error.message };
  }
};

// Send booking confirmation email
exports.sendBookingConfirmationEmail = async (email, name, bookingDetails) => {
  try {
    const {
      tourTitle,
      tourDescription,
      bookingDate,
      numberOfPeople,
      totalPrice,
      duration,
      highlights,
    } = bookingDetails;

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: `Booking Confirmation - ${tourTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
            <h2 style="color: #333; text-align: center;">Travlystiq - Booking Confirmed</h2>
            <p style="color: #666; font-size: 16px;">Hello <strong>${name}</strong>,</p>
            <p style="color: #666; font-size: 16px;">
              Your tour booking has been confirmed! Here are your booking details:
            </p>

            <div style="background-color: #fff; border: 2px solid #ff9500; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #ff9500; margin-top: 0;">${tourTitle}</h3>
              <p style="color: #666; margin: 5px 0;"><strong>Description:</strong> ${tourDescription}</p>
              <p style="color: #666; margin: 5px 0;"><strong>Duration:</strong> ${duration}</p>
              <p style="color: #666; margin: 5px 0;"><strong>Number of People:</strong> ${numberOfPeople}</p>
              <p style="color: #666; margin: 5px 0;"><strong>Booking Date:</strong> ${new Date(
                bookingDate
              ).toLocaleDateString("en-IN")}</p>
              <p style="color: #666; margin: 5px 0;"><strong>Total Price:</strong> ₹${totalPrice.toLocaleString(
                "en-IN"
              )}</p>
            </div>

            ${
              highlights && highlights.length > 0
                ? `
              <div style="background-color: #fff; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h4 style="color: #333; margin-top: 0;">Tour Highlights:</h4>
                <ul style="color: #666; padding-left: 20px;">
                  ${highlights.map((h) => `<li>${h}</li>`).join("")}
                </ul>
              </div>
            `
                : ""
            }

            <p style="color: #666; font-size: 14px;">
              Thank you for choosing Travlystiq! We're excited to show you amazing places. 
              Our team will contact you soon with more details.
            </p>
            <p style="color: #666; font-size: 14px;">
              If you have any questions, please reply to this email or contact our support team.
            </p>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              Travlystiq Travel &copy; 2025. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "Booking confirmation sent" };
  } catch (error) {
    console.error("Error sending booking email:", error);
    return { success: false, message: error.message };
  }
};
