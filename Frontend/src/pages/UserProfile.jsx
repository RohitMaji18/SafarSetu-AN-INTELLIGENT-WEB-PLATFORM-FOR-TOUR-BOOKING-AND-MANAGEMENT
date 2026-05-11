import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import apiClient from "../services/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, Loader2, ShieldCheck } from "lucide-react";

const UserProfile = () => {
  const { user, updateUser, loading } = useContext(AuthContext);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Pre-fill data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdateData = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const { data } = await apiClient.updateMe({ name, email });
      updateUser(data.user);
      toast.success("Profile information updated!");
    } catch (err) {
      // api.js handling errors
    }
    setIsUpdating(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await apiClient.updateMe({ currentPassword, password });
      toast.success("Password secured successfully!");
      setCurrentPassword("");
      setPassword("");
    } catch (err) {
      // api.js handling errors
    }
    setIsUpdating(false);
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-background text-secondary">
      <Loader2 className="h-8 w-8 animate-spin mb-4" />
      <p className="font-black uppercase tracking-widest text-[10px]">Accessing Profile...</p>
    </div>
  );

  if (!user) return (
    <div className="h-screen flex items-center justify-center bg-background">
      <p className="font-bold text-foreground/40 uppercase tracking-widest">Please log in to view profile.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck size={14} /> 
            Verified Account
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-foreground leading-none">
            User <span className="text-secondary">Settings</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Form 1: Personal Info */}
          <Card className="border border-border bg-white rounded-[2.5rem] shadow-xl shadow-foreground/5 overflow-hidden">
            <form onSubmit={handleUpdateData}>
              <CardHeader className="pb-8 border-b border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <User size={20} className="text-secondary" />
                  <CardTitle className="text-xl font-black uppercase italic tracking-tight">Personal Info</CardTitle>
                </div>
                <CardDescription className="text-xs font-bold uppercase text-foreground/40 tracking-widest">
                  Update your display name and email.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 pt-8 text-left">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-14 rounded-xl bg-background border-border focus:border-secondary font-bold text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 rounded-xl bg-background border-border focus:border-secondary font-bold text-foreground"
                  />
                </div>
              </CardContent>
              
              <CardFooter className="pb-8 pt-4">
                <Button 
                  type="submit" 
                  disabled={isUpdating} 
                  className="w-full h-14 bg-secondary hover:bg-secondary/90 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-secondary/20 transition-all"
                >
                  {isUpdating ? <Loader2 className="animate-spin mr-2" /> : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Form 2: Security */}
          <Card className="border border-border bg-white rounded-[2.5rem] shadow-xl shadow-foreground/5 overflow-hidden">
            <form onSubmit={handleUpdatePassword}>
              <CardHeader className="pb-8 border-b border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <Lock size={20} className="text-secondary" />
                  <CardTitle className="text-xl font-black uppercase italic tracking-tight">Security</CardTitle>
                </div>
                <CardDescription className="text-xs font-bold uppercase text-foreground/40 tracking-widest">
                  Change your password to stay secure.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 pt-8 text-left">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="h-14 rounded-xl bg-background border-border focus:border-secondary font-bold text-foreground"
                    autoComplete="current-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-[10px] font-black uppercase tracking-widest text-foreground/50">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 rounded-xl bg-background border-border focus:border-secondary font-bold text-foreground"
                    autoComplete="new-password"
                  />
                </div>
              </CardContent>
              
              <CardFooter className="pb-8 pt-4">
                <Button 
                  type="submit" 
                  disabled={isUpdating} 
                  className="w-full h-14 bg-foreground hover:bg-foreground/90 text-white font-black uppercase tracking-widest rounded-xl shadow-lg transition-all"
                >
                  {isUpdating ? <Loader2 className="animate-spin mr-2" /> : "Update Password"}
                </Button>
              </CardFooter>
            </form>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;