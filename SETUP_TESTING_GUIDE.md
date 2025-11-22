# Setup & Testing Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account with connection string
- Stripe account (test mode) with API keys
- Gmail account with App Password (for email)

## Backend Setup

### 1. Install Dependencies

```powershell
cd C:\Users\rohit\Desktop\Travlystiq\Backend
npm install
```

### 2. Configure Environment Variables

Edit `Backend/.env` with:

```env
# Database
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/travlystiq

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=90d

# Stripe (get from https://dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Frontend URL for redirects
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail with App Password)
MAIL_SERVICE=gmail
MAIL_USER=your_email@gmail.com
MAIL_PASSWORD=your_16_character_app_password
```

**How to get Gmail App Password:**

1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication
3. Generate an App Password for Node.js
4. Use that 16-character password in MAIL_PASSWORD

### 3. Start Backend Server

```powershell
npm run start
```

Expected output:

```
server is running on port-> 3000
MongoDB connected successfully
```

---

## Frontend Setup

### 1. Install Dependencies

```powershell
cd C:\Users\rohit\Desktop\Travlystiq\Frontend
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables

Create or edit `Frontend/.env`:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_your_public_key_here
```

### 3. Start Frontend Development Server

```powershell
npm run dev
```

Expected output:

```
  VITE v7.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

Open http://localhost:5173 in your browser.

---

## Testing the Complete Flow

### Test 1: User Registration with OTP Verification

1. **Go to Register page** → `/register`
2. **Fill in details:**
   - Name: Test User
   - Email: your_email@gmail.com
   - Password: password123
   - Confirm Password: password123
3. **Click "Create an account"**

   - Should see toast: "OTP sent to your email!"
   - Redirected to `/verify-otp`

4. **Check your email for OTP**

   - Look for email from: `your_email@gmail.com`
   - Subject: "Email Verification - Travlystiq OTP"
   - Copy the 6-digit OTP

5. **Enter OTP on verification page**
   - Should see success message
   - Automatically redirected to `/login`

### Test 2: Login

1. **Go to Login page** → `/login`
2. **Enter credentials:**
   - Email: your_email@gmail.com (the one you just registered)
   - Password: password123
3. **Click "Sign in"**
   - Should see welcome toast
   - Redirected to home page
   - "My Bookings" link should appear in navbar

### Test 3: Browse Tours

1. **Click "Browse Tours"** or go to `/tours`
2. **View all available tours**
3. **Click on a tour to see details** → `/tours/1001` (for example)

### Test 4: Book a Tour (Complete Payment Flow)

1. **On tour details page, fill booking form:**
   - Select a date
   - Select number of people
   - See total price calculated
2. **Click "Book now"**
   - Should redirect to Stripe Checkout (you are logged in)
3. **On Stripe Checkout:**
   - Email: any email
   - Card Number: `4242 4242 4242 4242` (test card)
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)
4. **Click "Pay"**
   - Processing...
   - Should redirect to `/success` page
5. **On Success Page:**
   - See "Payment Successful!" message
   - See "Creating your booking..." briefly
   - Auto-redirected to `/my-bookings` after 3 seconds
6. **Check email for booking confirmation**
   - Should receive email with booking details:
     - Tour title and description
     - Booking date
     - Number of people
     - Total price
     - Tour highlights

### Test 5: View My Bookings

1. **On `/my-bookings` page:**

   - Should see the tour you just booked
   - Shows: tour image, title, booking date, status (Confirmed), price

2. **Can also access via navbar:**
   - Click profile dropdown → "My Bookings"

---

## Troubleshooting

### Email not being sent?

- Check `MAIL_USER` and `MAIL_PASSWORD` in backend `.env`
- Verify Gmail 2FA is enabled and App Password is generated
- Check backend console for email errors

### Stripe payment not working?

- Verify `STRIPE_PUBLIC_KEY` in frontend `.env`
- Verify `STRIPE_SECRET_KEY` in backend `.env`
- Make sure both are test keys (start with `pk_test_` and `sk_test_`)

### Frontend npm install fails?

- Run: `npm install --legacy-peer-deps` (React 19 requires this with current Stripe version)

### Backend connection fails?

- Check `MONGODB_URI` format and credentials
- Verify database exists in MongoDB Atlas
- Check firewall/network access to MongoDB

### OTP not received?

- Check spam/promotions folder in email
- Verify `MAIL_USER` is correct
- Wait a few seconds for email to arrive

---

## Admin Verification Checklist

- [ ] Backend running on port 3000
- [ ] Frontend running on port 5173
- [ ] Can create new user with OTP verification
- [ ] Can verify OTP and login
- [ ] Can browse tours
- [ ] Can complete booking with Stripe payment
- [ ] Received booking confirmation email
- [ ] Booking appears in "My Bookings" page

---

## Next Steps / Optional Features

- Implement Stripe webhook for server-side booking creation (recommended for production)
- Add resend OTP endpoint
- Add booking cancellation
- Add tour ratings and reviews
- Add tour search and filters
- Add payment receipt download
- Add admin dashboard
