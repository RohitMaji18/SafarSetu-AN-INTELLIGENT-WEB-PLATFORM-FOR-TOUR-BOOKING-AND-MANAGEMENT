import axios from "axios";
import { toast } from "sonner"; // <-- IMPORT TOAST

// Create an instance of axios with the base URL of your backend
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
});
// --- REQUEST INTERCEPTOR ---
// Har request se pehle ye check karega ki localStorage mein token hai ya nahi
apiClient.interceptors.request.use(
  (config) => {
    // Check kar ki tune login ke time token kis naam se save kiya tha
    // Agar 'token' hai toh yahi rehne de, agar 'jwt' hai toh change kar dena
    const token = localStorage.getItem("token"); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`📤 Request to ${config.url} - Token sent ✅`);
    } else {
      console.warn(`📤 Request to ${config.url} - NO TOKEN FOUND ⚠️`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// --- GLOBAL ERROR HANDLER ---
// This intercepts all responses. If it's an error, it shows a toast.
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Handle errors
    const message =
      error.response?.data?.message || "An unexpected error occurred.";
    
    console.error(`❌ API Error:`, {
      status: error.response?.status,
      message: message,
      url: error.config?.url,
      hasToken: !!localStorage.getItem("token")
    });

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

// Forgot Password
export const forgotPassword = (email) => {
  return apiClient.post("/users/forgot-password", { email });
};

// Reset Password
export const resetPassword = (data) => {
  return apiClient.post("/users/reset-password", data);
};

// You can add other API functions for tours, bookings, etc. here in the future.
export const getAllTours = (params = {}) => {
  return apiClient.get("/tours", { params });
};

// Get a single tour by id
export const getTour = (id) => {
  return apiClient.get(`/tours/${id}`);
};

// Get weather for a tour
export const getTourWeather = (tourId) => {
  return apiClient.get(`/tours/${tourId}/weather`);
};

// Get reviews for a tour
export const getTourReviews = (tourId) => {
  return apiClient.get(`/tours/${tourId}/reviews`);
};

// Get all reviews for landing page
export const getAllReviews = () => {
  return apiClient.get(`/reviews`);
};

// Submit a new review for a tour
export const postTourReview = (tourId, reviewData) => {
  return apiClient.post(`/tours/${tourId}/reviews`, reviewData);
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



// AI Recommendation Function
export const getAIRecommendation = (requestData) => {
  const payload =
    typeof requestData === "string"
      ? { userPreference: requestData }
      : requestData;
  return apiClient.post("/users/ai-recommend", payload);
};

export default apiClient;
