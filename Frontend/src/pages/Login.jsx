import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import AuthContext from "../context/AuthContext";
import { toast } from "sonner";

// Import shadcn/ui components
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
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await loginUser({ email, password });
      login(response.data.user, response.data.token);
      toast.success("Welcome back to Travlystiq!");
      navigate("/");
    } catch (err) {
      // Error managed by api.js toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-6 py-12">
      <Card className="w-full max-w-md border border-border bg-white rounded-[2.5rem] shadow-2xl shadow-foreground/5 overflow-hidden">
        
        <CardHeader className="text-center pt-12 pb-8 border-b border-border/50">
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center">
              <LogIn size={28} />
            </div>
          </div>
          <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-foreground leading-none">
            Welcome <span className="text-secondary">Back</span>
          </CardTitle>
          <CardDescription className="text-xs font-bold uppercase text-foreground/40 tracking-widest mt-2">
            Securely access your travel dashboard.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-10">
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-foreground/50 ml-1">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your registered email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 rounded-xl bg-background border-border focus:border-secondary font-bold text-foreground pl-11"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Password</Label>
                <Link to="/forgot-password" size="sm" className="text-[10px] font-black uppercase tracking-widest text-secondary hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 rounded-xl bg-background border-border focus:border-secondary font-bold text-foreground pl-11"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20" size={18} />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full h-16 bg-secondary hover:bg-secondary/90 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-secondary/20 transition-all mt-4"
            >
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Sign In"}
            </Button>

            <div className="text-center pt-6">
              <p className="text-[10px] font-black uppercase text-foreground/40 tracking-widest">
                New to Travlystiq?{" "}
                <Link to="/register" className="text-secondary hover:underline underline-offset-4">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;