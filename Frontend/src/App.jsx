import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner"; // <-- 1. IMPORT TOASTER

// ... other imports
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTPVerification from "./pages/OTPVerification";
import ToursPage from "./pages/ToursPage";
import TourPage from "./pages/TourPage";
import UserProfile from "./pages/UserProfile";
import SuccessPage from "./pages/SuccessPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminBookings from "./pages/AdminBookings";
// ... etc

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header>
          <Navbar />
        </header>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/tours/:id" element={<TourPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/success" element={<SuccessPage />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
          </Routes>
        </main>
        {/* THIS PROP (richColors) IS WHAT MAKES IT WORK */}
        <Toaster richColors position="top-center" />
      </div>
    </AuthProvider>
  );
}

export default App;
