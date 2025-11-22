import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
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

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="w-full p-4 bg-card border-b border-border">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-xl font-bold text-primary">
          Travlystiq
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/tours"
            className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
          >
            Tours
          </Link>

          {user ? (
            // --- Logged In View ---
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-10 w-10 border-2 border-primary">
                  {/* Your app serves 'public', so 'public/img/users/photo.jpg' becomes '/img/users/photo.jpg' */}
                  <AvatarImage
                    src={`http://localhost:3000/img/users/${user.photo}`}
                    alt={user.name}
                  />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Hi, {user.name}!</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-bookings">My Bookings</Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-orange-500">
                      Admin Panel
                    </DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/users">Manage Users</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/bookings">Manage Bookings</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-500 cursor-pointer"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // --- Logged Out View ---
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
