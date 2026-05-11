import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthContext from "../context/AuthContext";
import apiClient from "../services/api";
import { 
  ClipboardList, ArrowLeft, Trash2, Loader2, 
  User, MapPin, Calendar, Users, IndianRupee 
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
      toast.error("Protocol Error: Failed to retrieve booking logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Action Irreversible: Permanently delete this booking record?"))
      return;
    try {
      await apiClient.delete(`/admin/bookings/${bookingId}`);
      toast.success("Record purged successfully.");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to delete booking.");
    }
  };

  const handleChangeStatus = async (bookingId, newStatus) => {
    try {
      await apiClient.patch(`/admin/bookings/${bookingId}/status`, {
        status: newStatus,
      });
      toast.success(`Booking status shifted to ${newStatus}.`);
      fetchBookings();
    } catch (error) {
      toast.error("System error: Failed to update status.");
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-background text-secondary">
      <Loader2 className="h-10 w-10 animate-spin mb-4" />
      <p className="font-black uppercase tracking-widest text-[10px]">Accessing Transaction Logs...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest">
              <ClipboardList size={14} /> Transaction Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-foreground leading-none">
              Manage <span className="text-secondary">Bookings</span>
            </h1>
          </div>
          <Button 
            onClick={() => navigate("/admin")}
            variant="outline"
            className="rounded-xl border-border font-black uppercase tracking-widest text-[10px] h-12 px-6 hover:bg-muted transition-all"
          >
            <ArrowLeft size={14} className="mr-2" /> Hub Dashboard
          </Button>
        </div>

        {/* Bookings Table Card */}
        <div className="bg-white border border-border rounded-[2.5rem] shadow-2xl shadow-foreground/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground/40">Traveler</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground/40">Expedition</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground/40">Schedule & Pax</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground/40">Total Amount</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground/40">Status Control</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground/40 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-muted/10 transition-colors">
                    {/* User */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center text-secondary">
                          <User size={16} />
                        </div>
                        <span className="font-bold text-foreground text-sm">{booking.user?.name || "Guest"}</span>
                      </div>
                    </td>

                    {/* Tour */}
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="font-black uppercase italic text-xs text-foreground tracking-tight">{booking.tour?.title}</p>
                        <div className="flex items-center gap-1.5 text-foreground/40 text-[10px] font-bold uppercase">
                          <MapPin size={10} className="text-secondary" /> {booking.tour?.location}
                        </div>
                      </div>
                    </td>

                    {/* Date & People */}
                    <td className="px-8 py-6">
                      <div className="space-y-1 text-sm font-medium">
                        <div className="flex items-center gap-2 text-foreground/60 italic">
                          <Calendar size={14} className="text-secondary" /> {new Date(booking.bookingDate).toLocaleDateString("en-IN")}
                        </div>
                        <div className="flex items-center gap-2 text-foreground/40 text-[10px] font-black uppercase tracking-widest">
                          <Users size={12} /> {booking.numberOfPeople} Travelers
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1 font-black text-foreground">
                        <IndianRupee size={14} className="text-secondary" />
                        <span>{booking.totalPrice.toLocaleString("en-IN")}</span>
                      </div>
                    </td>

                    {/* Status Select */}
                    <td className="px-8 py-6">
                      <select
                        value={booking.status}
                        onChange={(e) => handleChangeStatus(booking._id, e.target.value)}
                        className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border-2 outline-none transition-all cursor-pointer ${
                          booking.status === "confirmed" 
                            ? "bg-green-50 border-green-200 text-green-600 focus:border-green-400" 
                            : booking.status === "cancelled"
                            ? "bg-red-50 border-red-200 text-red-600 focus:border-red-400"
                            : "bg-amber-50 border-amber-200 text-amber-600 focus:border-amber-400"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="p-3 text-foreground/20 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl"
                        title="Purge Record"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {bookings.length === 0 && (
            <div className="text-center py-20 bg-muted/5">
              <ClipboardList size={48} className="mx-auto text-foreground/10 mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">No transaction logs detected.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}