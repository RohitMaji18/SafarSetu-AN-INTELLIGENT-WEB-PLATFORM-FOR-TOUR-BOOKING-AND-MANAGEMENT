import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createBookingAfterPayment } from "../services/api";
import { CheckCircle2, ArrowRight, Loader2, PartyPopper } from "lucide-react";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);

  useEffect(() => {
    if (sessionId) {
      createBooking();
    }
  }, [sessionId]);

  const createBooking = async () => {
    setIsCreatingBooking(true);
    try {
      // API call to confirm booking
      await createBookingAfterPayment(sessionId);
      toast.success("Payment verified! Booking confirmed.");

      // Redirect logic
      const timer = setTimeout(() => {
        navigate("/my-bookings");
      }, 4000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Booking Error:", error);
      toast.error("Syncing your booking... please wait.");
      
      const timer = setTimeout(() => {
        navigate("/my-bookings");
      }, 4000);
      return () => clearTimeout(timer);
    } finally {
      setIsCreatingBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-20 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-xl w-full bg-white border border-border p-10 md:p-16 rounded-[3rem] shadow-2xl text-center relative z-10">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="h-24 w-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 size={48} strokeWidth={3} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest">
            <PartyPopper size={14} /> Confirmation Received
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-foreground leading-none">
            Payment <span className="text-secondary">Successful!</span>
          </h1>
          <p className="text-foreground/60 font-medium text-lg italic py-4">
            "Your expedition is locked in. A confirmation email is flying your way."
          </p>
        </div>

        {/* Dynamic Status Box */}
        <div className="my-10 p-6 bg-background border border-border rounded-2xl">
          {isCreatingBooking ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-secondary" size={24} />
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Syncing Booking Data...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] animate-pulse">
                Redirecting to your dashboard in 4 seconds
              </p>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-secondary animate-progress" />
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            to="/my-bookings"
            className="flex-1 bg-secondary hover:bg-secondary/90 text-white h-14 flex items-center justify-center rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-secondary/20"
          >
            My Bookings <ArrowRight size={16} className="ml-2" />
          </Link>
          <Link
            to="/tours"
            className="flex-1 bg-background border border-border hover:bg-muted text-foreground h-14 flex items-center justify-center rounded-xl font-black uppercase tracking-widest text-xs transition-all"
          >
            Explore More
          </Link>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 4s linear forwards;
        }
      `}} />
    </div>
  );
}