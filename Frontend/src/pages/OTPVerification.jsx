import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import apiClient from "../services/api";
import { Button } from "@/components/ui/button";
import { Mail, ShieldCheck, Loader2, Timer, ArrowLeft, RotateCcw } from "lucide-react";

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    if (!email) {
      navigate("/register");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [email, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post("/users/verify-otp", {
        email,
        otp,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        toast.success("Security Clearance Granted!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      toast.info("Resending code to your encrypted inbox...");
      // Add your actual resend API call here
    } finally {
      setLoading(false);
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12 relative overflow-hidden">
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white border border-border rounded-[3rem] p-10 shadow-2xl shadow-foreground/5 text-center">
          
          {/* Top Security Icon */}
          <div className="flex justify-center mb-8">
            <div className="h-20 w-20 bg-secondary/10 text-secondary rounded-[2rem] flex items-center justify-center border border-secondary/20">
              <ShieldCheck size={36} strokeWidth={2.5} />
            </div>
          </div>

          <div className="space-y-3 mb-10">
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-foreground leading-none">
              Verify <span className="text-secondary">Access</span>
            </h1>
            <p className="text-foreground/40 text-xs font-bold uppercase tracking-widest leading-relaxed">
              We've dispatched a code to <br />
              <span className="text-foreground border-b border-secondary/30">{email}</span>
            </p>
          </div>

          <form onSubmit={handleVerifyOTP} className="space-y-8">
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(val);
                }}
                placeholder="000000"
                className="w-full bg-background border-2 border-border h-20 rounded-2xl text-center text-4xl font-black tracking-[0.4em] text-foreground focus:outline-none focus:border-secondary transition-all placeholder:opacity-20"
                disabled={loading || timeLeft === 0}
              />
              
              {/* Timer Badge */}
              <div className="mt-6 flex items-center justify-center gap-2">
                <Timer size={14} className={timeLeft > 60 ? "text-foreground/40" : "text-red-500 animate-pulse"} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${timeLeft > 60 ? "text-foreground/40" : "text-red-500 font-black"}`}>
                  {timeLeft > 0 ? `Code expires in: ${formatTime(timeLeft)}` : "Security window closed"}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || timeLeft === 0 || otp.length !== 6}
              className="w-full h-16 bg-secondary hover:bg-secondary/90 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-secondary/20 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Authorize Entry"}
            </Button>
          </form>

          {/* Footer Actions */}
          <div className="mt-10 pt-8 border-t border-border flex flex-col gap-4">
            <button
              onClick={handleResendOTP}
              disabled={loading || timeLeft > 540} // Example: Wait 1 min to resend
              className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-secondary transition-colors disabled:opacity-30"
            >
              <RotateCcw size={14} /> 
              Resend Code
            </button>
            
            <button
              onClick={() => navigate("/register")}
              className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/20 hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} /> 
              Back to registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}