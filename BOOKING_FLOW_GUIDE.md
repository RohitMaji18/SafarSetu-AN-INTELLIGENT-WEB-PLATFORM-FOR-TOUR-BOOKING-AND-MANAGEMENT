# Complete Booking Flow - Testing Guide

## Full Flow Overview

1. **User Books a Tour**
   - User selects tour, date, and number of people
   - Clicks "Book now"
2. **Frontend → Backend**
   - BookingForm sends tour details to `/api/v1/create-checkout-session`
   - Backend creates Stripe checkout session with metadata
   - Returns session URL
3. **Stripe Checkout**
   - User enters payment details
   - Test card: `4242 4242 4242 4242` (Success)
   - Any future date + any CVC
4. **Payment Success**
   - Stripe redirects to `/success?session_id=cs_xxx`
   - SuccessPage receives session ID
   - Frontend calls `/api/v1/create-booking-after-payment` with session ID
   - Backend retrieves session from Stripe
   - Verifies payment status is "paid"
   - Creates BookTour entry in MongoDB with:
     - user: authenticated user ID
     - tour: tour ID (numeric)
     - numberOfPeople: from metadata
     - totalPrice: from metadata
     - bookingDate: from metadata
     - status: "confirmed"
5. **Auto-Redirect**
   - After 3 seconds, redirects to `/my-bookings`
   - Calls `/api/v1/bookings/my-bookings` (requires auth)
   - Backend finds all bookings where user ID matches
   - Returns bookings array
6. **Display Bookings**
   - MyBookingsPage shows all user bookings
   - Fetches tour details for each booking
   - Displays tour image, name, booking status, people count, total price

## Key API Endpoints

### Create Checkout Session

- **POST** `/api/v1/create-checkout-session`
- **Body:** `{ tourId, tourTitle, numberOfPeople, totalPrice, bookingDate }`
- **Returns:** `{ sessionId, sessionUrl }`
- **Auth:** Not required

### Create Booking After Payment

- **POST** `/api/v1/create-booking-after-payment`
- **Body:** `{ sessionId }`
- **Returns:** `{ status, data: { booking } }`
- **Auth:** Required (Bearer token)

### Get User Bookings

- **GET** `/api/v1/bookings/my-bookings`
- **Returns:** `{ status, results, data: { bookings } }`
- **Auth:** Required (Bearer token)

## Database Schema

### BookTour

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User) - optional
  tour: Number (ref: Tour) - numeric ID
  bookingDate: Date,
  numberOfPeople: Number,
  totalPrice: Number,
  status: "pending" | "confirmed" | "cancelled"
}
```

## Testing Checklist

- [ ] Backend server running: `npm run start`
- [ ] Frontend dev server running: `npm run dev`
- [ ] Stripe keys in Backend `.env`:
  - `STRIPE_SECRET_KEY=sk_test_...`
  - `STRIPE_WEBHOOK_SECRET=whsec_...`
  - `FRONTEND_URL=http://localhost:5173`
- [ ] User is logged in before booking
- [ ] Tour details page loads correctly
- [ ] "Book now" button redirects to Stripe
- [ ] Test payment completes successfully
- [ ] Booking entry created in MongoDB
- [ ] Success page shows session ID
- [ ] Auto-redirects to `/my-bookings` after 3 seconds
- [ ] My Bookings page displays the booking
- [ ] Booking shows tour image, title, status (confirmed)
- [ ] Can click "View Tour Details" link

## Debugging

### If booking doesn't appear:

1. **Check MongoDB:**

   ```javascript
   db.booktours.find({ user: ObjectId("...") });
   ```

2. **Check SuccessPage logs:**

   - Open browser DevTools (F12)
   - Look for "Creating your booking..." message
   - Check Network tab for `/create-booking-after-payment` request

3. **Check Backend logs:**

   - Look for "Booking creation error" messages
   - Verify auth middleware is working (token validation)

4. **Verify Token:**
   - LocalStorage should have `token` key
   - Header should include `Authorization: Bearer {token}`

### Common Issues:

- **"Not authenticated"** → User not logged in or token expired
- **"Payment not completed"** → Session status wasn't "paid"
- **"Cannot find tourId"** → Make sure tourId is numeric

## Success Indicators

✅ All tests pass
✅ Booking appears in "My Bookings"
✅ Tour image loads correctly
✅ Status shows as "confirmed"
✅ All booking details display correctly
