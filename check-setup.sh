#!/bin/bash
# Quick Test Script for Tour Booking Flow

echo "🔍 Checking Configuration Files..."

# Check Backend .env
if [ -f "Backend/.env" ]; then
  echo "✅ Backend .env exists"
  if grep -q "STRIPE_SECRET_KEY" Backend/.env; then
    echo "✅ STRIPE_SECRET_KEY configured"
  else
    echo "❌ STRIPE_SECRET_KEY missing"
  fi
  if grep -q "FRONTEND_URL" Backend/.env; then
    echo "✅ FRONTEND_URL configured"
  else
    echo "❌ FRONTEND_URL missing"
  fi
else
  echo "❌ Backend .env missing"
fi

# Check Frontend .env.local
if [ -f "Frontend/.env.local" ]; then
  echo "✅ Frontend .env.local exists"
  if grep -q "VITE_STRIPE_PUBLIC_KEY" Frontend/.env.local; then
    echo "✅ VITE_STRIPE_PUBLIC_KEY configured"
  else
    echo "❌ VITE_STRIPE_PUBLIC_KEY missing"
  fi
else
  echo "❌ Frontend .env.local missing (create it with VITE_STRIPE_PUBLIC_KEY=pk_test_...)"
fi

echo ""
echo "🔍 Checking Key Files..."

# Backend files
echo "Backend files:"
[ -f "Backend/controller/payment-controller.js" ] && echo "✅ payment-controller.js" || echo "❌ payment-controller.js"
[ -f "Backend/routes/payment-routes.js" ] && echo "✅ payment-routes.js" || echo "❌ payment-routes.js"
[ -f "Backend/routes/bookings-routes.js" ] && echo "✅ bookings-routes.js" || echo "❌ bookings-routes.js"
[ -f "Backend/controller/bookings-controller.js" ] && echo "✅ bookings-controller.js" || echo "❌ bookings-controller.js"

echo ""
echo "Frontend files:"
[ -f "Frontend/src/pages/SuccessPage.jsx" ] && echo "✅ SuccessPage.jsx" || echo "❌ SuccessPage.jsx"
[ -f "Frontend/src/pages/MyBookingsPage.jsx" ] && echo "✅ MyBookingsPage.jsx" || echo "❌ MyBookingsPage.jsx"
[ -f "Frontend/src/components/TourDetails/BookingForm.jsx" ] && echo "✅ BookingForm.jsx" || echo "❌ BookingForm.jsx"
[ -f "Frontend/src/services/api.js" ] && echo "✅ api.js" || echo "❌ api.js"

echo ""
echo "✅ Configuration check complete!"
echo ""
echo "🚀 To start testing:"
echo "1. Backend: cd Backend && npm run start"
echo "2. Frontend: cd Frontend && npm run dev"
echo "3. Visit http://localhost:5173"
echo "4. Login → Browse Tours → Click tour → Select date → Book now"
echo "5. Use test card: 4242 4242 4242 4242"
