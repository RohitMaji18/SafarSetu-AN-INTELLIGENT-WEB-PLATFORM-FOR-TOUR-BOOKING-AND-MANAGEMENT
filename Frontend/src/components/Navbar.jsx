import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CurrencyContext } from "../context/CurrencyContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Globe, LogOut, User, Briefcase, LayoutDashboard, Orbit } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { currency, setCurrency } = useContext(CurrencyContext); 
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    // Clean Glass Effect as per your style
    <nav className="w-full px-6 py-3 bg-white/70 backdrop-blur-xl border-b border-border sticky top-0 z-[500]">
      <div className="max-w-7xl flex items-center justify-between mx-auto">
        
        {/* Brand Logo - 360 Rotation with New Orange */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative p-2 bg-primary rounded-full shadow-lg shadow-primary/20">
            <Orbit size={20} className="text-white animate-[spin_10s_linear_infinite]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-foreground uppercase italic leading-none">
             Tourmate
            </span>
            {/* Ab ye wahi vibrant orange hai jo aapne image mein dikhaya tha */}
            <span className="text-[8px] tracking-[0.3em] text-secondary font-black uppercase mt-1">
              Next-Gen Travel
            </span>
          </div>
        </Link>

        {/* Floating Nav Nodes */}
        <div className="hidden md:flex items-center gap-1 bg-muted/40 p-1 rounded-full border border-border">
          {[
            { name: "Explore", path: "/" },
            { name: "Tours", path: "/tours" },
            { name: "About", path: "/about" },
            { name: "Contact", path: { pathname: "/", hash: "#contact" } },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                typeof link.path === "string" && isActive(link.path)
                  ? "bg-primary text-white shadow-md"
                  : "text-foreground/70 hover:text-primary hover:bg-white/50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          {/* Currency Switcher */}
          <div className="hidden sm:flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-lg border border-border group transition-all hover:border-primary/50">
            <Globe size={12} className="text-primary" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-[10px] font-black outline-none cursor-pointer text-foreground"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer group pl-2 border-l border-border">
                   <div className="hidden lg:block text-right">
                      <p className="text-[10px] font-black text-foreground uppercase tracking-tighter">{user.name.split(" ")[0]}</p>
                      <p className="text-[8px] text-secondary font-black uppercase tracking-widest">Explorer</p>
                   </div>
                   <Avatar className="h-10 w-10 border-2 border-primary/20 rounded-lg group-hover:border-primary transition-all">
                     <AvatarImage src={`http://localhost:3000/img/users/${user.photo}`} />
                     <AvatarFallback className="bg-primary text-white font-bold">{user.name[0]}</AvatarFallback>
                   </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 bg-white border border-border rounded-xl shadow-2xl">
                <DropdownMenuLabel className="px-4 py-4 border-b border-border/50 mb-2">
                  <p className="text-[9px] text-primary uppercase font-black tracking-[0.2em] mb-1">User Profile</p>
                  <p className="text-sm font-bold text-foreground truncate">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuItem asChild className="rounded-lg py-3 focus:bg-primary/10 focus:text-primary cursor-pointer text-foreground font-bold">
                  <Link to="/profile" className="flex items-center gap-3"><User size={16}/> Profile Setting</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg py-3 focus:bg-primary/10 focus:text-primary cursor-pointer text-foreground font-bold">
                  <Link to="/my-bookings" className="flex items-center gap-3"><Briefcase size={16}/> My Journeys</Link>
                </DropdownMenuItem>
                
                {user.role === "admin" && (
                  <DropdownMenuItem asChild className="rounded-lg py-3 focus:bg-secondary/10 focus:text-secondary cursor-pointer text-secondary font-black">
                    <Link to="/admin" className="flex items-center gap-3"><LayoutDashboard size={16}/> Master Console</Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem onClick={logout} className="text-destructive hover:bg-destructive/10 rounded-lg py-3 cursor-pointer font-bold transition-all">
                  <LogOut size={16} className="mr-3"/> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-5">
              <Link to="/login" className="text-[10px] font-bold text-foreground/70 hover:text-primary uppercase tracking-[0.2em]">
                Login
              </Link>
              {/* Vibrant Orange Button */}
              <Button asChild className="bg-secondary hover:bg-secondary/90 text-white font-black text-[10px] uppercase tracking-widest rounded-none skew-x-[-12deg] px-6 transition-all shadow-md">
                <Link to="/register" className="skew-x-[12deg]">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;