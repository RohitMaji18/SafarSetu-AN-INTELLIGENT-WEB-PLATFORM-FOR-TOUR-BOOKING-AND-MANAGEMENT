# My Bookings Feature Setup

## What's New

Users can now:

1. Click "My Bookings" in the dropdown menu (next to My Profile)
2. View all their tour bookings with details
3. After successful payment, automatically redirect to My Bookings page

## Changes Made

### Frontend

**Components:**

- `Navbar.jsx` — Added "My Bookings" option to dropdown menu

**Pages:**

- `MyBookingsPage.jsx` — New page showing user's bookings with tour details, status, and pricing
- `SuccessPage.jsx` — Updated to auto-redirect to My Bookings after 3 seconds

**Services:**

- `api.js` — Added `getUserBookings()` function

**Routes:**

- `App.jsx` — Added `/my-bookings` route

### Backend

**Controller:**

- `bookings-controller.js` — Added `getUserBookings()` endpoint to fetch user's bookings

**Routes:**

- `bookings-routes.js` — Added GET `/bookings/my-bookings` route with authentication middleware

## User Flow

1. User completes payment → redirected to success page
2. After 3 seconds → automatically redirected to `/my-bookings`
3. Can also access "My Bookings" from dropdown menu (next to profile)
4. Displays all bookings with:
   - Tour image and title
   - Booking status (pending/confirmed/cancelled)
   - Number of people
   - Total price
   - Booking date
   - Link to view full tour details

## API Endpoint

**GET `/api/v1/bookings/my-bookings`**

- Requires authentication
- Returns all bookings for the logged-in user
- Sorted by booking date (newest first)

## Frontend Environment

No additional environment variables needed. The feature uses existing Stripe and API setup.

## Testing

1. Complete a tour booking and payment
2. On success page, wait 3 seconds to auto-redirect
3. Or click "View My Bookings" button immediately
4. Or use dropdown menu → My Bookings

## Status Indicators

- **Confirmed** — Green (payment successful)
- **Pending** — Yellow (awaiting confirmation)
- **Cancelled** — Red (booking cancelled)

## Notes

- Requires user to be logged in to view bookings
- Fetches tour details for each booking to display full information
- Empty state message if user has no bookings yet
- Responsive design for mobile and desktop
