import React, { useMemo, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthContext from "../../context/AuthContext";
import { CurrencyContext } from "../../context/CurrencyContext";
import { createCheckoutSession } from "../../services/api";
import { Calendar, Users, ArrowRight, ShieldCheck, Info, Loader2 } from "lucide-react";

export default function BookingForm({ 
  tourId, 
  pricePerPerson = 0, 
  tourTitle = "Tour Booking", 
  groupSize = 10, 
  duration = 1 
}) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { formatPrice, currency } = useContext(CurrencyContext);
  
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(1);
  const [loading, setLoading] = useState(false);

  // Total Calculation
  const totalAmount = useMemo(() => Number(pricePerPerson) * Number(people || 1), [pricePerPerson, people]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) return toast.error("Please select a travel date.");
    
    if (people > groupSize) {
        return toast.error(`Maximum capacity for this tour is ${groupSize} people.`);
    }

    if (!user) { 
        toast.error("Please login to continue booking."); 
        navigate("/login"); 
        return; 
    }
    
    setLoading(true);
    try {
      const res = await createCheckoutSession({
        tourId, 
        tourTitle, 
        numberOfPeople: Number(people), 
        totalPrice: totalAmount, 
        bookingDate: date,
      });
      // Redirect to Stripe
      window.location.href = res.data.sessionUrl;
    } catch (err) {
      toast.error("Payment gateway connection failed. Try again.");
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* 1. Date Selection */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-foreground/50">
          <span className="flex items-center gap-2"><Calendar size={14} className="text-secondary" /> Travel Date</span>
          <span className="text-secondary font-bold">{duration} Days Trip</span>
        </label>
        <input
          type="date"
          min={new Date().toISOString().slice(0, 10)}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-background border border-border p-4 rounded-xl font-bold text-foreground outline-none focus:border-secondary transition-all"
        />
      </div>

      {/* 2. People Count */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-foreground/50">
          <span className="flex items-center gap-2"><Users size={14} className="text-secondary" /> Number of People</span>
          <span>Limit: {groupSize}</span>
        </label>
        <input
          className="w-full bg-background border border-border p-4 rounded-xl font-bold text-foreground focus:border-secondary outline-none transition-all"
          type="number" 
          min={1} 
          max={groupSize} 
          value={people}
          onChange={(e) => {
              const val = Number(e.target.value);
              if (val <= groupSize) setPeople(val);
              else toast.warning(`Max ${groupSize} seats per booking.`);
          }}
        />
      </div>

      {/* 3. Simple Price Breakdown */}
      <div className="p-6 bg-secondary/5 border border-secondary/20 rounded-2xl flex justify-between items-center">
        <div>
          <p className="text-[9px] font-black text-foreground/40 uppercase tracking-widest mb-1">Total Payable</p>
          <p className="text-3xl font-black text-foreground italic">{formatPrice(totalAmount)}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-black text-secondary uppercase tracking-widest">Currency</p>
          <p className="text-xs font-bold text-foreground">{currency}</p>
        </div>
      </div>

      {/* 4. Action Button - Using Vibrant Orange */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/90 text-white py-5 rounded-xl font-black uppercase tracking-widest transition-all shadow-xl shadow-secondary/20 active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>Book Your Adventure <ArrowRight size={20} /></>
        )}
      </button>

      {/* 5. Trust Badge */}
      <div className="flex justify-center items-center gap-2 opacity-50">
          <ShieldCheck size={14} className="text-green-600" />
          <span className="text-[9px] font-black uppercase tracking-widest">Secure Checkout via Stripe</span>
      </div>
    </form>
  );
}