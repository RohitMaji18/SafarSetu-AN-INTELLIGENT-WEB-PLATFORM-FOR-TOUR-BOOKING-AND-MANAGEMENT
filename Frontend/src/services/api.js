import axios from "axios";
import { toast } from "sonner"; // <-- IMPORT TOAST

// Create an instance of axios with the base URL of your backend
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

// --- GLOBAL ERROR HANDLER ---
// This intercepts all responses. If it's an error, it shows a toast.
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Handle errors
    const message =
      error.response?.data?.message || "An unexpected error occurred.";
    toast.error(message); // Show the error toast

    // IMPORTANT: Re-throw the error so component .catch() blocks still work
    return Promise.reject(error);
  }
);

// This function will handle user registration
export const registerUser = (userData) => {
  return apiClient.post("/users/register", userData);
};

// This function will handle user login
export const loginUser = (credentials) => {
  return apiClient.post("/users/login", credentials);
};

// You can add other API functions for tours, bookings, etc. here in the future.
export const getAllTours = () => {
  return apiClient.get("/tours");
};

// Get a single tour by id
export const getTour = (id) => {
  return apiClient.get(`/tours/${id}`);
};

// Create a booking (client-side booking endpoint)
export const postBooking = (bookingData) => {
  return apiClient.post(`/bookings`, bookingData);
};

// Create a Stripe checkout session for tour booking
export const createCheckoutSession = (checkoutData) => {
  return apiClient.post(`/create-checkout-session`, checkoutData);
};

// Get all bookings for the current user
export const getUserBookings = () => {
  return apiClient.get("/bookings/my-bookings");
};

// Create booking after successful Stripe payment
export const createBookingAfterPayment = (sessionId) => {
  return apiClient.post("/create-booking-after-payment", { sessionId });
};

// --- NEW FUNCTIONS TO MATCH YOUR BACKEND ---

// Gets the current user's data
// Corresponds to: GET /api/v1/users/me
apiClient.getMe = () => {
  return apiClient.get("/users/me");
};

// Updates the current user's data
// Corresponds to: PATCH /api/v1/users/updateMe
apiClient.updateMe = (updateData) => {
  return apiClient.patch("/users/updateMe", updateData);
};

// --- ADMIN API FUNCTIONS ---

// Get dashboard statistics
export const getAdminDashboard = () => {
  return apiClient.get("/admin/dashboard");
};

// Get all users (admin)
export const getAdminUsers = () => {
  return apiClient.get("/admin/users");
};

// Update user role (admin)
export const updateUserRole = (userId, role) => {
  return apiClient.patch(`/admin/users/${userId}/role`, { role });
};

// Delete user (admin)
export const deleteAdminUser = (userId) => {
  return apiClient.delete(`/admin/users/${userId}`);
};

// Get all bookings (admin)
export const getAdminBookings = () => {
  return apiClient.get("/admin/bookings");
};

// Update booking status (admin)
export const updateBookingStatus = (bookingId, status) => {
  return apiClient.patch(`/admin/bookings/${bookingId}/status`, { status });
};

// Delete booking (admin)
export const deleteAdminBooking = (bookingId) => {
  return apiClient.delete(`/admin/bookings/${bookingId}`);
};

export default apiClient;
