import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthContext from "../context/AuthContext";
import apiClient from "../services/api";

export default function AdminBookings() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const response = await apiClient.get("/admin/bookings");
      setBookings(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;
    try {
      await apiClient.delete(`/admin/bookings/${bookingId}`);
      toast.success("Booking deleted successfully");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to delete booking");
    }
  };

  const handleChangeStatus = async (bookingId, newStatus) => {
    try {
      await apiClient.patch(`/admin/bookings/${bookingId}/status`, {
        status: newStatus,
      });
      toast.success("Booking status updated successfully");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to update booking status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Bookings</h1>
          <button
            onClick={() => navigate("/admin")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  User
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Tour
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  People
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{booking.user?.name}</td>
                  <td className="px-6 py-3">{booking.tour?.title}</td>
                  <td className="px-6 py-3">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">{booking.numberOfPeople}</td>
                  <td className="px-6 py-3">
                    ₹{booking.totalPrice.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-3">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleChangeStatus(booking._id, e.target.value)
                      }
                      className="px-2 py-1 border rounded bg-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleDeleteBooking(booking._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No bookings found
          </div>
        )}
      </div>
    </div>
  );
}
