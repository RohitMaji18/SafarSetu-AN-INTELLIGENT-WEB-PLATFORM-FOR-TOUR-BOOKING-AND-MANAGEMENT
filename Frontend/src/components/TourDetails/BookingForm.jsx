import React, { useMemo, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthContext from "../../context/AuthContext";
import { createCheckoutSession } from "../../services/api";
import { loadStripe } from "@stripe/stripe-js";

export default function BookingForm({
  tourId,
  pricePerPerson = 0,
  onBooked,
  availableDates = [],
  tourTitle = "Tour Booking",
}) {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);
  const [date, setDate] = useState(availableDates?.[0] || "");
  const [people, setPeople] = useState(1);
  const [loading, setLoading] = useState(false);

  const total = useMemo(
    () => Number(pricePerPerson) * Number(people || 1),
    [pricePerPerson, people]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Require a logged-in user to create a checkout session
      if (!user) {
        toast.error("Please log in to book this tour.");
        navigate("/login");
        return;
      }
      // Get Stripe public key from env
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      if (!stripePublicKey) {
        throw new Error("Stripe public key not found. Check your .env file.");
      }

      // Call backend to create checkout session
      const res = await createCheckoutSession({
        tourId,
        tourTitle,
        numberOfPeople: Number(people),
        totalPrice: total,
        bookingDate: date || new Date().toISOString(),
      });

      // Get session URL from backend
      const { sessionUrl } = res.data;

      if (!sessionUrl) {
        throw new Error("Failed to create checkout session");
      }

      // Redirect to Stripe checkout
      window.location.href = sessionUrl;
    } catch (err) {
      console.error(err);
      // api interceptor will show toast for errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border rounded-lg p-4 mx-auto max-w-md"
    >
      <div>
        <label className="block text-sm text-muted-foreground mb-1">
          Select date
        </label>
        <select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full input"
        >
          {(availableDates && availableDates.length > 0
            ? availableDates
            : [new Date().toISOString().slice(0, 10)]
          ).map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-muted-foreground mb-1">
          People
        </label>
        <input
          className="input"
          type="number"
          min={1}
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />
      </div>

      <div className="text-lg font-semibold">
        Total: ₹{Number(total).toLocaleString("en-IN")}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className={`text-black bg-orange-500 hover:bg-orange-600 focus:ring-0 px-4 py-2 rounded ${
            loading || authLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={loading || authLoading}
        >
          {loading ? "Processing..." : authLoading ? "Checking..." : "Book now"}
        </button>
      </div>
    </form>
  );
}
