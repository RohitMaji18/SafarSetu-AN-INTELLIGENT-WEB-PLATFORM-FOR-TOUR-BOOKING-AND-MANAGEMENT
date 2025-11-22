import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createBookingAfterPayment } from "../services/api";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);

  useEffect(() => {
    if (sessionId) {
      toast.success("Payment successful! Your booking has been confirmed.");
      createBooking();
    }
  }, [sessionId]);

  const createBooking = async () => {
    setIsCreatingBooking(true);
    try {
      // Create booking in database using session ID
      await createBookingAfterPayment(sessionId);

      // Redirect to My Bookings after 3 seconds
      const timer = setTimeout(() => {
        navigate("/my-bookings");
      }, 3000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error(
        "Failed to create booking. You can view it in My Bookings shortly."
      );
      // Still redirect to My Bookings even if there's an error
      const timer = setTimeout(() => {
        navigate("/my-bookings");
      }, 3000);
      return () => clearTimeout(timer);
    } finally {
      setIsCreatingBooking(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 text-center">
      <div className="mb-6">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-4xl font-extrabold">Payment Successful!</h1>
      </div>

      <p className="text-lg text-muted-foreground mb-4">
        Thank you for your booking. Your tour reservation has been confirmed.
      </p>

      {isCreatingBooking && (
        <div className="bg-card p-4 rounded-lg mb-6 text-sm text-muted-foreground">
          <p className="text-blue-500 mt-2">Creating your booking...</p>
        </div>
      )}

      <div className="space-y-3">
        <p className="text-base">
          A confirmation email will be sent to you shortly with all the details.
        </p>
        <p className="text-base text-blue-500 font-semibold">
          Redirecting to My Bookings in 3 seconds...
        </p>
      </div>

      <div className="mt-8 flex gap-4 justify-center">
        <Link
          to="/my-bookings"
          className="bg-orange-500 text-black px-6 py-2 rounded hover:bg-orange-600"
        >
          View My Bookings
        </Link>
        <Link
          to="/tours"
          className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300"
        >
          Browse More Tours
        </Link>
      </div>
    </div>
  );
}
