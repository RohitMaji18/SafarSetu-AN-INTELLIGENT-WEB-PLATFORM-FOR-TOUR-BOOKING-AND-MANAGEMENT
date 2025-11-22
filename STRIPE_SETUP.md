# Stripe Integration Setup Guide

## Overview

When users click "Book now" on a tour, they are redirected to a Stripe Checkout page where they can complete the payment. After successful payment, they are redirected to a success page.

## Files Added/Modified

### Backend

- `controller/payment-controller.js` - Creates Stripe checkout sessions and handles webhooks
- `routes/payment-routes.js` - Payment endpoints
- `server.js` - Added payment routes

### Frontend

- `components/TourDetails/BookingForm.jsx` - Updated to use Stripe instead of direct booking
- `components/TourDetails/TourDetails.jsx` - Added tourTitle prop
- `pages/SuccessPage.jsx` - Success page after payment
- `services/api.js` - Added createCheckoutSession function
- `App.jsx` - Added /success route

## Setup Instructions

### 1. Get Stripe API Keys

1. Go to https://dashboard.stripe.com/
2. Sign up or log in
3. Go to Developers > API Keys
4. Copy your **Secret Key** and **Public Key**

### 2. Configure Backend Environment Variables

Edit `Backend/.env` and add:

```env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx (optional for webhooks)
FRONTEND_URL=http://localhost:5173
```

### 3. Configure Frontend Environment Variables

Create or edit `Frontend/.env.local` and add:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
```

### 4. Install Dependencies

**Backend:**

```powershell
cd Backend
npm install
```

**Frontend:**

```powershell
cd Frontend
npm install
```

### 5. Start the Application

**Backend (Terminal 1):**

```powershell
cd Backend
npm start
```

**Frontend (Terminal 2):**

```powershell
cd Frontend
npm run dev
```

## How It Works

### User Flow

1. User selects a tour and clicks "View Details"
2. On the details page, user selects a date and number of people
3. User clicks "Book now" button
4. Frontend calls `/api/v1/create-checkout-session`
5. Backend creates a Stripe checkout session and returns the session URL
6. Frontend redirects user to Stripe Checkout page
7. User enters payment details and completes payment
8. After payment success, user is redirected to `/success` page
9. A booking entry is created in your database (optional - requires webhook setup)

### Payment Flow (Backend)

```
BookingForm.jsx
    ↓
createCheckoutSession() API call
    ↓
POST /api/v1/create-checkout-session
    ↓
payment-controller.js (creates Stripe session)
    ↓
Stripe API (creates checkout session)
    ↓
Returns session URL to frontend
    ↓
Frontend redirects to Stripe Checkout
```

## Testing with Stripe Test Cards

Use these card numbers to test in test mode:

- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **Require Auth:** 4000 0025 0000 3155

Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)

## Optional: Webhook Setup (For Auto-Booking Creation)

To automatically create booking entries in your database when payment succeeds:

1. In Stripe Dashboard, go to Webhooks
2. Add Endpoint: `http://your-backend-url/api/v1/webhook`
3. Select event: `checkout.session.completed`
4. Copy the Webhook Secret and add to `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```
5. Uncomment the TODO in `payment-controller.js` handleStripeWebhook to create BookTour entries

## Troubleshooting

### "Stripe public key not found"

- Check that `VITE_STRIPE_PUBLIC_KEY` is in your `Frontend/.env.local`
- Make sure the key starts with `pk_test_` (for testing) or `pk_live_` (for production)

### "STRIPE_SECRET_KEY not defined"

- Check that `STRIPE_SECRET_KEY` is in your `Backend/.env`
- Make sure the key starts with `sk_test_` (for testing) or `sk_live_` (for production)
- Restart your backend server after adding the key

### Redirect Loop

- Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
- Ensure both frontend and backend are running

### Payment Not Creating Booking

- Webhook setup is optional. Without it, bookings are only created when manually calling `/api/v1/bookings`
- To enable auto-booking on payment, set up webhooks as described above

## Production Considerations

Before going live:

1. Switch from test keys to live keys
2. Update `success_url` and `cancel_url` in payment-controller.js to your production domain
3. Set up webhook verification for security
4. Use HTTPS everywhere
5. Store sensitive keys securely (never commit `.env` to git)
6. Test with real Stripe account before going live

## Support

For more info, see:

- Stripe Docs: https://stripe.com/docs/checkout
- Stripe React: https://stripe.com/docs/stripe-js/react
