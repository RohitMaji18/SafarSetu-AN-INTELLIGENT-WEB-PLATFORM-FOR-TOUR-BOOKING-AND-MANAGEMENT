import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTour, postBooking } from "../services/api";
import TourDetails from "../components/TourDetails/TourDetails";

export default function TourPage() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getTour(id)
      .then((res) => {
        // API returns { data: { tour } }
        const payload = res.data?.data?.tour || res.data?.tour || res.data;
        setTour(payload);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load tour details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooked = (res) => {
    // simple success handling; the API interceptor already shows errors
    alert("Booking successful!");
  };

  if (loading) return <div className="p-8">Loading tour...</div>;
  if (error) return <div className="p-8 text-destructive">{error}</div>;
  if (!tour) return <div className="p-8">Tour not found.</div>;

  return <TourDetails tour={tour} onBooked={handleBooked} />;
}
