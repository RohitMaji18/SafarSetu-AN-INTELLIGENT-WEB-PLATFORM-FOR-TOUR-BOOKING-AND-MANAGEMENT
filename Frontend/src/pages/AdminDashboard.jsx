import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthContext from "../context/AuthContext";
import apiClient from "../services/api";
import { 
  Users, Calendar, Map as MapIcon, IndianRupee, 
  ArrowRight, Loader2, ShieldCheck, Activity,
  UserCheck, ClipboardList, Briefcase
} from "lucide-react";

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
      toast.error("Dashboard synchronization failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-background">
      <Loader2 className="h-10 w-10 animate-spin text-secondary mb-4" />
      <p className="font-black uppercase tracking-widest text-[10px] text-foreground/40">Loading Command Center...</p>
    </div>
  );

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 1. Dashboard Header */}
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck size={14} /> System Administrator
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-foreground leading-none">
            Business <span className="text-secondary">Metrics.</span>
          </h1>
        </div>

        {/* 2. Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Travelers"
            value={stats.totalUsers}
            icon={<Users size={24} />}
            trend="Active Registry"
          />
          <StatCard
            label="Bookings"
            value={stats.totalBookings}
            icon={<Calendar size={24} />}
            trend="Scheduled Tours"
          />
          <StatCard
            label="Listed Tours"
            value={stats.totalTours}
            icon={<MapIcon size={24} />}
            trend="Global Routes"
          />
          <StatCard
            label="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
            icon={<IndianRupee size={24} />}
            trend="Gross Income"
            highlight={true}
          />
        </div>

        {/* 3. Management Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ManagementCard
            title="Manage Users"
            description="Control access levels and traveler data"
            link="/admin/users"
            icon={<UserCheck size={28} />}
          />
          <ManagementCard
            title="Manage Bookings"
            description="Audit and verify transaction status"
            link="/admin/bookings"
            icon={<ClipboardList size={28} />}
          />
          <ManagementCard
            title="Manage Tours"
            description="Deploy or modify adventure packages"
            link="/admin/tours"
            icon={<Briefcase size={28} />}
          />
        </div>

        {/* 4. Recent Transactions Table */}
        <div className="bg-white border border-border rounded-[2.5rem] shadow-2xl shadow-foreground/5 overflow-hidden text-left">
          <div className="p-8 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black uppercase italic tracking-tight">Recent Activity</h2>
              <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mt-1">Latest tour registrations</p>
            </div>
            <Activity className="text-secondary animate-pulse" size={20} />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">User</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Expedition</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Date</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Amount</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stats.recentBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-8 py-5 font-bold text-sm">{booking.user?.name}</td>
                    <td className="px-8 py-5 text-sm font-medium text-foreground/60">{booking.tour?.title}</td>
                    <td className="px-8 py-5 text-sm font-medium text-foreground/40">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5 font-black text-sm">
                      ₹{booking.totalPrice.toLocaleString("en-IN")}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                        booking.status === "confirmed"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-amber-500/10 text-amber-600"
                      }`}>
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

function StatCard({ label, value, icon, trend, highlight }) {
  return (
    <div className={`p-8 rounded-[2.5rem] border border-border shadow-sm text-left transition-all hover:border-secondary/20 group ${highlight ? 'bg-foreground text-white' : 'bg-white text-foreground'}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-2xl ${highlight ? 'bg-secondary' : 'bg-background border border-border text-secondary'}`}>
          {icon}
        </div>
        <div className="text-[9px] font-black uppercase tracking-widest opacity-40">{trend}</div>
      </div>
      <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${highlight ? 'text-white/40' : 'text-foreground/40'}`}>{label}</p>
      <p className="text-3xl font-black tracking-tighter">{value}</p>
    </div>
  );
}

function ManagementCard({ title, description, link, icon }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(link)}
      className="bg-white border border-border p-8 rounded-[2.5rem] cursor-pointer hover:shadow-2xl hover:border-secondary transition-all group text-left"
    >
      <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-background border border-border text-secondary group-hover:scale-110 transition-transform mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-black uppercase italic tracking-tight mb-2 leading-none">{title}</h3>
      <p className="text-foreground/40 text-xs font-bold uppercase tracking-widest mb-6 leading-relaxed">{description}</p>
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary group-hover:gap-4 transition-all">
        Open Module <ArrowRight size={14} />
      </div>
    </div>
  );
}