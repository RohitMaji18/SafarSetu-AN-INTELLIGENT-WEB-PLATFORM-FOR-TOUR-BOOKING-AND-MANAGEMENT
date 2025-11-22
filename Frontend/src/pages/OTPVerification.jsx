import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import apiClient from "../services/api";

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  React.useEffect(() => {
    if (!email) {
      navigate("/register");
      return;
    }

    // Timer for OTP expiration
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [email, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post("/users/verify-otp", {
        email,
        otp,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        toast.success("Email verified successfully!");
        navigate("/login");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "OTP verification failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      // This would require implementing a resend OTP endpoint on the backend
      toast.info("Resend OTP feature coming soon");
    } catch (error) {
      toast.error("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-600">
              We've sent a 6-digit OTP to
              <br />
              <span className="font-semibold text-gray-900">{email}</span>
            </p>
          </div>

          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(val);
                }}
                placeholder="000000"
                className="w-full px-4 py-3 text-center text-2xl font-bold tracking-widest border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                disabled={loading || timeLeft === 0}
              />
            </div>

            {timeLeft > 0 ? (
              <div className="text-center text-sm text-gray-600">
                OTP expires in:{" "}
                <span className="font-bold text-orange-500">
                  {formatTime(timeLeft)}
                </span>
              </div>
            ) : (
              <div className="text-center text-sm text-red-500 font-semibold">
                OTP has expired. Please request a new one.
              </div>
            )}

            <button
              type="submit"
              disabled={loading || timeLeft === 0 || otp.length !== 6}
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <div className="mt-6 border-t pt-4">
            <p className="text-center text-sm text-gray-600">
              Didn't receive the OTP?{" "}
              <button
                onClick={handleResendOTP}
                disabled={loading}
                className="text-orange-500 font-semibold hover:text-orange-600 disabled:opacity-50"
              >
                Resend
              </button>
            </p>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/register")}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Back to Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
