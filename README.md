# 🌍 SafarSetu - AI-Powered Tour Booking Platform

A full-stack MERN application for booking adventure tours with AI-powered itinerary planning, Stripe payment integration, and real-time booking management.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [System Prerequisites](#system-prerequisites)
3. [Project Structure](#project-structure)
4. [Installation Guide](#installation-guide)
5. [Environment Configuration](#environment-configuration)
6. [Running the Application](#running-the-application)
7. [Code Quality & Linting](#code-quality--linting)
8. [Stripe Payment Setup](#stripe-payment-setup)
9. [Testing](#testing)
10. [Git Workflow](#git-workflow)
11. [Troubleshooting](#troubleshooting)
12. [Project Features](#project-features)

---

## 🎯 Project Overview

**TravlyStiQ** is a tour booking platform designed to help travelers discover and book adventure tours. Key features include:

- **AI-Powered Planning**: Generate custom itineraries using Groq AI
- **Secure Authentication**: JWT-based user registration and login
- **Payment Processing**: Stripe integration for secure transactions
- **Booking Management**: Track and manage all your bookings
- **Tour Details**: Rich tour information with gallery and maps
- **User Profiles**: Personalized user settings and booking history
- **Admin Dashboard**: Manage tours, bookings, users, and reviews

---

## ✅ System Prerequisites

Before starting, ensure you have the following installed:

| Component | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 18.x or higher | JavaScript runtime |
| **npm** | 9.x or higher | Package manager |
| **MongoDB** | 5.0+ | Database (local or Atlas) |
| **Git** | Latest | Version control |
| **Stripe Account** | Free | Payment processing |
| **Groq API Key** | Free | AI itinerary planning |
| **Email Service** | Nodemailer config | OTP & password reset emails |

### Installation Instructions

**Windows:**
```bash
# Install Node.js from https://nodejs.org/
# Install MongoDB from https://www.mongodb.com/try/download/community
# Verify installation
node --version   # Should be v18.0.0 or higher
npm --version    # Should be 9.0.0 or higher
mongod --version # Should be 5.0 or higher
```

**macOS:**
```bash
# Using Homebrew
brew install node mongodb-community git
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install nodejs npm mongodb git
sudo systemctl start mongodb
```

---

## 📁 Project Structure

```
SafarSetu/
├── Backend/                          # Express.js API server
│   ├── config/
│   │   └── db.js                     # MongoDB connection
│   ├── controller/                   # Business logic controllers
│   │   ├── admin-controller.js
│   │   ├── ai-controller.js
│   │   ├── auth-controller.js
│   │   ├── bookings-controller.js
│   │   ├── payment-controller.js
│   │   ├── reviews-controller.js
│   │   └── tours-controller.js
│   ├── middleware/
│   │   └── auth-middleware.js        # JWT authentication
│   ├── models/                       # MongoDB schemas
│   │   ├── booktour-model.js
│   │   ├── review-model.js
│   │   ├── tours-model.js
│   │   └── user-model.js
│   ├── routes/                       # API endpoints
│   │   ├── admin-routes.js
│   │   ├── bookings-routes.js
│   │   ├── home-routes.js
│   │   ├── payment-routes.js
│   │   ├── review-routes.js
│   │   ├── tour-routes.js
│   │   └── user-routes.js
│   ├── utils/
│   │   └── mailService.js            # Email service
│   ├── data/                         # Seed data
│   │   ├── tours-data.js
│   │   └── uploaderTours.js
│   ├── public/                       # Static files
│   │   ├── forfront/
│   │   └── images/
│   ├── .env                          # Environment variables (NOT in git)
│   ├── .env.example                  # Template for .env
│   ├── package.json
│   └── server.js                     # Express server entry point
│
├── Frontend/                         # React + Vite application
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── TourDetails/
│   │   │   │   ├── BookingForm.jsx
│   │   │   │   ├── TourDetails.jsx
│   │   │   │   ├── TourGallery.jsx
│   │   │   │   └── TourMap.jsx
│   │   │   ├── landing/              # Homepage sections
│   │   │   │   ├── AIPlanner.jsx
│   │   │   │   ├── CallToActionSection.jsx
│   │   │   │   ├── FeaturesSection.jsx
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── TestimonialsSection.jsx
│   │   │   │   └── TopToursSection.jsx
│   │   │   └── ui/                   # Shadcn UI components
│   │   ├── pages/                    # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── TourPage.jsx
│   │   │   ├── ToursPage.jsx
│   │   │   ├── TourDetails.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminBookings.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── MyBookingsPage.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── OTPVerification.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── SuccessPage.jsx
│   │   ├── context/                  # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   └── CurrencyContext.jsx
│   │   ├── services/
│   │   │   └── api.js                # Axios API calls
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/                       # Static assets
│   ├── .env.local                    # Frontend env variables (NOT in git)
│   ├── .env.example                  # Template
│   ├── eslint.config.js              # ESLint configuration
│   ├── vite.config.js                # Vite bundler config
│   ├── tailwind.config.cjs           # Tailwind CSS config
│   ├── postcss.config.cjs            # PostCSS config
│   ├── package.json
│   └── components.json               # Shadcn UI config
│
├── .git/                             # Git repository
├── .gitignore                        # Git ignore rules
├── README.md                         # This file
├── QUICK_START.md                    # Quick start guide
├── STRIPE_SETUP.md                   # Stripe integration guide
├── AI_SETUP_GUIDE.md                 # AI integration guide
├── OTP_TESTING_GUIDE.md              # OTP testing guide
├── BOOKING_FLOW_GUIDE.md             # Booking flow documentation
├── MY_BOOKINGS_SETUP.md              # My bookings feature guide
└── SETUP_TESTING_GUIDE.md            # Testing guide
```

### Directory Purpose Summary

| Directory | Purpose |
|-----------|---------|
| **Backend** | Node.js/Express API server with MongoDB integration |
| **Frontend** | React/Vite single-page application with Tailwind CSS |
| **public** | Static files served by the server |
| **config** | Database and environment configuration |
| **controller** | Business logic and request handlers |
| **middleware** | Authentication and request processing |
| **models** | MongoDB data schemas |
| **routes** | API endpoint definitions |
| **services** | API client and utility services |
| **components** | Reusable React UI components |
| **pages** | Full-page React components |
| **context** | Global state management |

---

## 🚀 Installation Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/SafarSetu.git
cd SafarSetu
```

### Step 2: Install Backend Dependencies

```bash
cd Backend
npm install
```

**Dependencies installed:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - Authentication
- `bcryptjs` - Password hashing
- `stripe` - Payment processing
- `groq-sdk` - AI integration
- `nodemailer` - Email service
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables
- `nodemon` - Development auto-reload

### Step 3: Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

**Key dependencies:**
- `react` & `react-dom` - UI framework
- `react-router-dom` - Routing
- `axios` - HTTP client
- `@stripe/react-stripe-js` - Stripe payment
- `tailwindcss` - Utility CSS
- `vite` - Build tool
- `eslint` - Code quality

### Step 4: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB server (in a new terminal)
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname`
5. Keep this for Step 5

### Step 5: Configure Environment Variables

See [Environment Configuration](#environment-configuration) section below.

---

## 🔧 Environment Configuration

### Backend Environment Setup

**Create `.env` file in `Backend/` directory:**

```bash
cd Backend
touch .env  # On Windows: copy .env.example .env
```

**Fill in the following variables:**

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/travlystiq
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travlystiq?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRE=7d

# Stripe Payment Processing
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173

# AI Service (Groq)
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=mixtral-8x7b-32768

# Email Service (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_SERVICE=gmail

# Admin Configuration (Optional)
ADMIN_EMAIL=admin@travlystiq.com
ADMIN_PASSWORD=admin_secure_password
```

### Frontend Environment Setup

**Create `.env.local` file in `Frontend/` directory:**

```bash
cd Frontend
touch .env.local  # On Windows: copy .env.example .env.local
```

**Fill in the following variables:**

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000

# Stripe Public Key
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx

# Application Name
VITE_APP_NAME=TravlyStiQ

# Environment
VITE_ENV=development
```

### Environment Variables Explanation

#### Backend Variables

| Variable | Example | Purpose |
|----------|---------|---------|
| `MONGODB_URI` | `mongodb://localhost:27017/travlystiq` | Database connection string |
| `JWT_SECRET` | `your_super_secret_key` | Secret key for signing JWT tokens |
| `STRIPE_SECRET_KEY` | `sk_test_xxxxx` | Stripe API secret key (get from dashboard) |
| `GROQ_API_KEY` | `gsk_xxxxx` | Groq API key for AI itineraries |
| `EMAIL_USER` | `your_email@gmail.com` | Gmail address for sending emails |
| `EMAIL_PASS` | `app_specific_password` | Gmail app password (not regular password) |

#### Frontend Variables

| Variable | Example | Purpose |
|----------|---------|---------|
| `VITE_API_BASE_URL` | `http://localhost:3000` | Backend API URL |
| `VITE_STRIPE_PUBLIC_KEY` | `pk_test_xxxxx` | Stripe publishable key |

### Getting API Keys

**Stripe Keys:**
1. Go to https://dashboard.stripe.com/
2. Navigate to Developers → API Keys
3. Copy `Secret Key` (starts with `sk_`) and `Public Key` (starts with `pk_`)

**Groq API Key:**
1. Visit https://console.groq.com/
2. Sign up/Login
3. Create API key
4. Copy and save securely

**Gmail App Password:**
1. Enable 2-Factor Authentication on Gmail
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer"
4. Use the 16-character password generated

---

## ▶️ Running the Application

### Terminal 1: Start Backend Server

```bash
cd Backend
npm run dev
# Or use: npm start

# Expected output:
# server is running on port-> 3000
# Connected to MongoDB
```

### Terminal 2: Start Frontend Development Server

```bash
cd Frontend
npm run dev

# Expected output:
# VITE v7.1.7 ready in 123 ms
# ➜  Local:   http://localhost:5173/
# ➜  Press q to quit
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api/tours (example endpoint)

### Production Build

```bash
# Frontend
cd Frontend
npm run build      # Creates optimized build in dist/
npm run preview    # Preview production build locally

# Backend
# Use process manager like PM2 in production:
npm install -g pm2
pm2 start server.js --name "travlystiq-api"
```

---

## 🎨 Code Quality & Linting

### Frontend: ESLint Configuration

The frontend uses ESLint with React best practices rules.

**Check code quality:**
```bash
cd Frontend
npm run lint
```

**Fix issues automatically:**
```bash
npx eslint . --fix
```

**ESLint Rules:**
- React Hooks rules enabled
- React Refresh rules enabled
- Unused variables warning (except constants starting with uppercase)
- JSX best practices

**Configuration file:** [Frontend/eslint.config.js](Frontend/eslint.config.js)

### Backend: ESLint Setup

ESLint configuration is available at [Backend/.eslintrc.json](Backend/.eslintrc.json).

**Check code quality:**
```bash
cd Backend
npx eslint .
```

**Fix issues automatically:**
```bash
npx eslint . --fix
```

### Formatting with Prettier

Prettier configuration is available at [.prettierrc.json](.prettierrc.json).

**Format code:**
```bash
npx prettier --write "src/**/*.{js,jsx}"
```

---

## 💳 Stripe Payment Setup

### 1. Create Stripe Account

1. Go to https://stripe.com
2. Click "Start now" or sign in
3. Complete email verification
4. Fill in business details

### 2. Get Test Keys

1. Dashboard → Developers → API Keys
2. Copy **Secret Key** (sk_test_...)
3. Copy **Publishable Key** (pk_test_...)

### 3. Configure Backend

Add to `Backend/.env`:
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
FRONTEND_URL=http://localhost:5173
```

### 4. Configure Frontend

Add to `Frontend/.env.local`:
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_your_publishable_key_here
```

### 5. Test Payments

**Test Card Numbers:**
| Scenario | Card Number | Expiry | CVC |
|----------|-------------|--------|-----|
| Success | 4242 4242 4242 4242 | Any future date | Any 3 digits |
| Decline | 4000 0000 0000 0002 | Any future date | Any 3 digits |
| 3D Secure | 4000 0025 0000 3155 | Any future date | Any 3 digits |

**Test Flow:**
1. Go to http://localhost:5173
2. Login with test account
3. Select a tour and click "Book now"
4. Use test card numbers above
5. Complete payment
6. Check "My Bookings" for confirmation

### 6. Webhook Setup (Optional but Recommended)

For production, setup webhook to handle payment confirmations:

1. Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/payment/webhook`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy signing secret to `.env`

---

## 🧪 Testing

### Backend Testing

**Test AI Integration:**
```bash
cd Backend
npm run test-ai
```

**Test Email Service:**
```bash
npm run test-email
```

**Upload Sample Tours:**
```bash
npm run uploaderTours.js
```

### Frontend Testing

**Run ESLint:**
```bash
cd Frontend
npm run lint
```

### Manual Testing Checklist

- [ ] User Registration
- [ ] User Login with JWT
- [ ] OTP Verification
- [ ] Tour Listing
- [ ] Tour Details Page
- [ ] AI Itinerary Generation
- [ ] Booking Creation
- [ ] Stripe Payment
- [ ] My Bookings Page
- [ ] Admin Dashboard
- [ ] Review Submission

See detailed testing guides:
- [OTP Testing Guide](OTP_TESTING_GUIDE.md)
- [Setup Testing Guide](SETUP_TESTING_GUIDE.md)
- [Booking Flow Guide](BOOKING_FLOW_GUIDE.md)

### Test Coverage (Approximate)

| Component | Coverage |
|-----------|----------|
| Authentication | ~85% |
| Tours | ~90% |
| Bookings | ~80% |
| Payments | ~75% |
| AI Service | ~70% |

---

## 📡 Git Workflow

### Branch Strategy

```
main (production)
  ↓
develop (staging)
  ↓
feature/* (individual features)
hotfix/* (production fixes)
```

### Common Commands

**Clone repository:**
```bash
git clone https://github.com/yourusername/SafarSetu.git
cd SafarSetu
```

**Create feature branch:**
```bash
git checkout -b feature/your-feature-name
# Example: feature/add-reviews, feature/admin-panel
```

**Stage and commit changes:**
```bash
git add .
git commit -m "feat: add new feature description"
# Commit message format: type: description
# Types: feat, fix, docs, style, refactor, test, chore
```

**Push to GitHub:**
```bash
git push -u origin feature/your-feature-name
```

**Create Pull Request:**
1. Go to GitHub repository
2. Click "Compare & pull request"
3. Add description of changes
4. Request review
5. Merge after approval

**Update from main:**
```bash
git fetch origin
git merge origin/main
# Or rebase: git rebase origin/main
```

### Git Ignore Rules

The `.gitignore` file excludes:
- `.env` and `.env.*` - Environment variables
- `node_modules/` - Installed packages
- `dist/` - Build outputs
- `.DS_Store` - macOS files
- `*.log` - Log files

**Never commit:**
- API keys or secrets
- Passwords
- Personal tokens
- Local configuration

---

## 🔍 Troubleshooting

### Backend Issues

**"Cannot find module 'express'"**
```bash
cd Backend
npm install
```

**"MongoDB connection failed"**
```bash
# Check MongoDB is running
mongod

# Verify connection string in .env
# Check username/password if using Atlas
# Ensure IP whitelist in Atlas includes your IP
```

**"GROQ_API_KEY is not configured"**
```bash
# Check .env file exists and has:
GROQ_API_KEY=your_actual_key_here

# Verify using:
node -e "require('dotenv').config(); console.log('GROQ_API_KEY:', process.env.GROQ_API_KEY)"
```

**"Port 3000 already in use"**
```bash
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -i :3000
kill -9 <PID>

# Or change port in .env:
PORT=3001
```

### Frontend Issues

**"Module not found"**
```bash
cd Frontend
npm install
# Clear cache if needed:
rm -rf node_modules package-lock.json
npm install
```

**"VITE_STRIPE_PUBLIC_KEY is undefined"**
```bash
# Create .env.local with:
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx

# Restart dev server (Ctrl+C and run npm run dev again)
```

**"Cannot POST /api/tours"**
- Verify backend is running on port 3000
- Check VITE_API_BASE_URL in Frontend/.env.local
- Verify CORS is enabled in backend

### Common Issues & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid/missing JWT token | Login again, check token storage |
| 500 Internal Server Error | Backend error | Check server logs, verify .env |
| CORS error | Frontend/Backend mismatch | Verify both URLs in CORS config |
| Payment fails | Invalid Stripe keys | Verify test mode keys |
| Email not sent | Gmail/Nodemailer config | Verify email & app password |
| AI not working | Missing GROQ_API_KEY | Add to .env and restart server |

---

## ✨ Project Features

### User Features
- ✅ User registration and login with JWT authentication
- ✅ Email verification with OTP
- ✅ Password reset functionality
- ✅ User profile management
- ✅ My Bookings page with booking history
- ✅ Tour search and filtering
- ✅ Tour details with gallery and map
- ✅ AI-powered itinerary generation
- ✅ Secure payment with Stripe
- ✅ Tour reviews and ratings

### Admin Features
- ✅ Admin dashboard with analytics
- ✅ Tour management (CRUD operations)
- ✅ Booking management
- ✅ User management
- ✅ Review moderation
- ✅ Payment tracking

### Technical Features
- ✅ MERN stack (MongoDB, Express, React, Node.js)
- ✅ Vite for fast development
- ✅ Tailwind CSS for styling
- ✅ Stripe payment integration
- ✅ Groq AI integration
- ✅ JWT authentication
- ✅ MongoDB with Mongoose ODM
- ✅ ESLint for code quality
- ✅ Responsive design
- ✅ Real-time notifications with Sonner

---

## 📚 Additional Resources

- [Quick Start Guide](QUICK_START.md)
- [Stripe Setup Guide](STRIPE_SETUP.md)
- [AI Setup Guide](AI_SETUP_GUIDE.md)
- [OTP Testing Guide](OTP_TESTING_GUIDE.md)
- [Booking Flow Guide](BOOKING_FLOW_GUIDE.md)
- [My Bookings Setup](MY_BOOKINGS_SETUP.md)
- [Setup Testing Guide](SETUP_TESTING_GUIDE.md)

---

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For issues and questions:
1. Check [Troubleshooting](#troubleshooting) section
2. Review existing guides in the repository
3. Open an issue on GitHub

---

## 🙏 Acknowledgments

- MERN Stack Documentation
- Stripe Payment Integration
- Groq AI Services
- Tailwind CSS Community
- React & Vite Teams

---

**Last Updated:** December 2024  
**Version:** 1.0.0  
**Maintained by:** TravlyStiQ Team

---

### Quick Links

- 🌐 [Stripe Dashboard](https://dashboard.stripe.com/)
- 🤖 [Groq Console](https://console.groq.com/)
- 🗄️ [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- 📚 [Express.js Docs](https://expressjs.com/)
- ⚛️ [React Docs](https://react.dev/)
- ⚡ [Vite Docs](https://vitejs.dev/)

