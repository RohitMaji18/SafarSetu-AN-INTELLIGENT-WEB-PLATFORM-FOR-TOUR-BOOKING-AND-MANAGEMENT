import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getUserBookings, getTour } from "../services/api";
import AuthContext from "../context/AuthContext";
import { toast } from "sonner";
import { 
  Calendar, Users, CreditCard, MapPin, 
  ArrowRight, Loader2, Bookmark, CheckCircle2, Clock, XCircle 
} from "lucide-react";

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

  const getStatusStyles = (status) => {
    switch (status) {
      case "confirmed":
        return { color: "text-green-600", bg: "bg-green-500/10", icon: <CheckCircle2 size={14} /> };
      case "pending":
        return { color: "text-amber-600", bg: "bg-amber-500/10", icon: <Clock size={14} /> };
      case "cancelled":
        return { color: "text-red-600", bg: "bg-red-500/10", icon: <XCircle size={14} /> };
      default:
        return { color: "text-gray-600", bg: "bg-gray-500/10", icon: <Clock size={14} /> };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-background">
      <Loader2 className="h-10 w-10 animate-spin text-secondary mb-4" />
      <p className="font-black uppercase tracking-widest text-[10px] text-foreground/40">Syncing Bookings...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest">
              <Bookmark size={14} fill="currentColor" /> Account Dashboard
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-foreground leading-none">
              My <span className="text-secondary">Expeditions</span>
            </h1>
          </div>
          <p className="text-foreground/40 font-bold uppercase text-xs tracking-widest border-b-2 border-secondary pb-2">
            Total {bookings.length} Bookings
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white border border-border p-16 rounded-[3rem] text-center shadow-xl shadow-foreground/5">
            <p className="text-xl font-bold text-foreground/30 uppercase tracking-widest mb-8">
              No journeys scheduled yet.
            </p>
            <Link
              to="/tours"
              className="inline-flex items-center gap-3 bg-secondary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20"
            >
              Start Exploring <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="space-y-8 text-left">
            {bookings.map((booking) => {
              const tour = toursData[booking.tour];
              const status = getStatusStyles(booking.status);
              
              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-[2.5rem] border border-border shadow-xl shadow-foreground/5 overflow-hidden group hover:border-secondary/20 transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-10">
                    
                    {/* Tour Image Section */}
                    <div className="lg:col-span-3 relative h-48 lg:h-full min-h-[200px] overflow-hidden rounded-[1.5rem]">
                      <img
                        src={
                          tour?.image?.[0]?.startsWith("http")
                            ? tour.image[0]
                            : `${import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:3000'}/${tour?.image?.[0] || ''}`
                        }
                        alt={tour?.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md ${status.bg} ${status.color} text-[9px] font-black uppercase tracking-widest border border-white/20`}>
                        {status.icon} {booking.status}
                      </div>
                    </div>

                    {/* Booking Details Section */}
                    <div className="lg:col-span-9 flex flex-col justify-between">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-foreground leading-none">
                            {tour?.title || "Tour Expedition"}
                          </h2>
                          <div className="flex items-center gap-2 text-foreground/40 font-bold text-[10px] uppercase tracking-widest">
                            <MapPin size={12} className="text-secondary" /> {tour?.location || "Locked Location"}
                          </div>
                        </div>
                        <div className="text-left md:text-right">
                           <p className="text-[9px] font-black text-foreground/30 uppercase tracking-[0.2em] mb-1">Booking ID</p>
                           <p className="text-xs font-bold text-foreground font-mono">#{booking._id.slice(-8).toUpperCase()}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 border-t border-border/50 pt-8">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[9px] font-black text-foreground/30 uppercase tracking-widest mb-2">
                            <Calendar size={14} className="text-secondary" /> Date
                          </div>
                          <p className="text-sm font-black text-foreground uppercase">{formatDate(booking.bookingDate)}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[9px] font-black text-foreground/30 uppercase tracking-widest mb-2">
                            <Users size={14} className="text-secondary" /> Guests
                          </div>
                          <p className="text-sm font-black text-foreground uppercase">{booking.numberOfPeople} People</p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[9px] font-black text-foreground/30 uppercase tracking-widest mb-2">
                            <CreditCard size={14} className="text-secondary" /> Total
                          </div>
                          <p className="text-sm font-black text-secondary">₹{Number(booking.totalPrice).toLocaleString("en-IN")}</p>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-end">
                        <Link
                          to={`/tours/${tour?._id}`}
                          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground hover:text-secondary transition-colors"
                        >
                          View Full Itinerary <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}