import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getUserBookings, getTour } from "../services/api";
import AuthContext from "../context/AuthContext";
import { toast } from "sonner";

export default function MyBookingsPage() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toursData, setToursData] = useState({});

  useEffect(() => {
    if (!user) {
      setError("Please log in to view your bookings");
      setLoading(false);
      return;
    }

    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await getUserBookings();
      const bookingsData = res.data?.data?.bookings || res.data?.bookings || [];
      setBookings(bookingsData);

      // Fetch tour details for each booking
      if (bookingsData.length > 0) {
        await fetchTourDetails(bookingsData);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  const fetchTourDetails = async (bookingsData) => {
    const tours = {};
    for (const booking of bookingsData) {
      try {
        const res = await getTour(booking.tour);
        const tourData = res.data?.data?.tour || res.data?.tour;
        tours[booking.tour] = tourData;
      } catch (err) {
        console.error(`Failed to fetch tour ${booking.tour}:`, err);
      }
    }
    setToursData(tours);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">You need to log in</h1>
        <p className="text-muted-foreground mb-6">
          Please log in to view your bookings
        </p>
        <Link
          to="/login"
          className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="text-lg">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="text-lg text-destructive mb-4">{error}</p>
        <Link
          to="/tours"
          className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
        >
          Browse Tours
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage all your tour bookings
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-card p-8 rounded-lg text-center">
          <p className="text-lg text-muted-foreground mb-4">
            You haven't booked any tours yet.
          </p>
          <Link
            to="/tours"
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            Explore Tours
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => {
            const tour = toursData[booking.tour];
            return (
              <div
                key={booking._id}
                className="bg-card p-6 rounded-lg shadow-sm border border-border"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Tour Image */}
                  {tour?.image?.[0] && (
                    <div className="lg:col-span-1">
                      <img
                        src={
                          tour.image[0].startsWith("http")
                            ? tour.image[0]
                            : `http://localhost:3000/${tour.image[0]}`
                        }
                        alt={tour?.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Booking Details */}
                  <div className="lg:col-span-3">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {tour?.title || "Tour"}
                        </h2>
                        <p className="text-muted-foreground">
                          {tour?.location}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Booking Date
                        </p>
                        <p className="font-semibold">
                          {formatDate(booking.bookingDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Number of People
                        </p>
                        <p className="font-semibold">
                          {booking.numberOfPeople}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Price
                        </p>
                        <p className="font-semibold">
                          ₹{Number(booking.totalPrice).toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Booking ID
                        </p>
                        <p className="font-semibold text-xs">
                          {booking._id.slice(-8)}
                        </p>
                      </div>
                    </div>

                    {tour && (
                      <Link
                        to={`/tours/${tour._id}`}
                        className="mt-4 inline-block text-orange-500 hover:text-orange-600 font-semibold"
                      >
                        View Tour Details →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
