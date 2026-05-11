import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail, Lock, ShieldAlert, Loader2 } from "lucide-react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const userData = { name, email, password, confirmPassword };
    if (adminCode) userData.adminCode = adminCode;

    setIsSubmitting(true);
    try {
      await registerUser(userData);
      toast.success("OTP sent to your email! Verify to join Travlystiq.");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      // Error handling is managed by api.js toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-6 py-12">
      <Card className="w-full max-w-md border border-border bg-white rounded-[2.5rem] shadow-2xl shadow-foreground/5 overflow-hidden">
        <CardHeader className="text-center pt-10 pb-8 border-b border-border/50">
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center">
              <UserPlus size={28} />
            </div>
          </div>
          <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-foreground">
            Join <span className="text-secondary">Tourmate</span>
          </CardTitle>
          <CardDescription className="text-xs font-bold uppercase text-foreground/40 tracking-widest mt-2">
            Create an account to start your journey.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-10">
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 rounded-xl bg-background border-border focus:border-secondary font-bold text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="hello@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-xl bg-background border-border focus:border-secondary font-bold text-foreground"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 rounded-xl bg-background border-border focus:border-secondary font-bold text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Confirm</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-14 rounded-xl bg-background border-border focus:border-secondary font-bold text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label htmlFor="admin-code" className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Admin Code (Optional)</Label>
              <div className="relative">
                <Input
                  id="admin-code"
                  type="password"
                  placeholder="Only for authorized personnel"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  className="h-14 rounded-xl bg-background border-border focus:border-secondary font-bold text-foreground pr-10"
                />
                {adminCode && (
                   <ShieldAlert className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary animate-pulse" size={18} />
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full h-16 bg-secondary hover:bg-secondary/90 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-secondary/20 transition-all mt-4"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Create Account"}
            </Button>

            <div className="text-center pt-4">
              <p className="text-[10px] font-black uppercase text-foreground/40 tracking-widest">
                Already a traveler?{" "}
                <Link to="/login" className="text-secondary hover:underline underline-offset-4">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;