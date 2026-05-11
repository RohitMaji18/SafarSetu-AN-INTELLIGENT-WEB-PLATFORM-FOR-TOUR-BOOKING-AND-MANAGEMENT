import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // 1. Footer Import kiya
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTPVerification from "./pages/OTPVerification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ToursPage from "./pages/ToursPage";
import TourPage from "./pages/TourPage";
import UserProfile from "./pages/UserProfile";
import SuccessPage from "./pages/SuccessPage";
import About from "./pages/About";
import MyBookingsPage from "./pages/MyBookingsPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminBookings from "./pages/AdminBookings";

function App() {
  // 2. Location hook ka use path check karne ke liye
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    let attempts = 0;

    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts < 5) {
        attempts += 1;
        setTimeout(scrollToElement, 100);
      }
    };

    scrollToElement();
  }, [location]);

  // 3. Wo routes jahan Footer nahi dikhana hai
  const hideFooterRoutes = ["/login", "/register", "/verify-otp", "/forgot-password", "/reset-password"];
  const shouldShowFooter = !hideFooterRoutes.some(route => location.pathname.startsWith(route));

  return (
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/about" element={<About />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
          </Routes>
        </main>

        {/* 4. Footer Logic: Condition match hogi tabhi render hoga */}
        {shouldShowFooter && <Footer />}
      </div>
  );
}

export default App;