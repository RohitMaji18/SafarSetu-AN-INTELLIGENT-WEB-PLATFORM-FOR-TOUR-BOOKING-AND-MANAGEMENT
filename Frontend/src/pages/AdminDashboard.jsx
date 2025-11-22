import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthContext from "../context/AuthContext";
import apiClient from "../services/api";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
      return;
    }

    fetchDashboardStats();
  }, [user, navigate]);

  const fetchDashboardStats = async () => {
    try {
      const response = await apiClient.get("/admin/dashboard");
      setStats(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Users"
            value={stats.totalUsers}
            icon="👥"
            color="bg-blue-500"
          />
          <StatCard
            label="Total Bookings"
            value={stats.totalBookings}
            icon="📅"
            color="bg-green-500"
          />
          <StatCard
            label="Total Tours"
            value={stats.totalTours}
            icon="🗺️"
            color="bg-purple-500"
          />
          <StatCard
            label="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
            icon="💰"
            color="bg-orange-500"
          />
        </div>

        {/* Management Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ManagementCard
            title="Manage Users"
            description="View, edit, or delete users"
            link="/admin/users"
            icon="👤"
          />
          <ManagementCard
            title="Manage Bookings"
            description="View and manage all bookings"
            link="/admin/bookings"
            icon="📋"
          />
          <ManagementCard
            title="Manage Tours"
            description="Create, edit, or delete tours"
            link="/admin/tours"
            icon="🧳"
          />
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-2 text-left">User</th>
                  <th className="px-4 py-2 text-left">Tour</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentBookings.map((booking) => (
                  <tr key={booking._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{booking.user?.name}</td>
                    <td className="px-4 py-2">{booking.tour?.title}</td>
                    <td className="px-4 py-2">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      ₹{booking.totalPrice.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className={`${color} text-white rounded-lg shadow-md p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

function ManagementCard({ title, description, link, icon }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(link)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <button className="text-orange-500 font-semibold hover:text-orange-600">
        Go to {title.split(" ")[1]} →
      </button>
    </div>
  );
}
