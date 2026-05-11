# AI Planner Setup & Fix Guide

## ✅ Issues Fixed

### 1. **Frontend Component (AIPlanner.jsx)**
- ✅ Fixed API import to use proper `getAIRecommendation()` function
- ✅ Added proper error logging and user-friendly error messages
- ✅ Improved response handling with better error context

### 2. **Backend Controller (ai-controller.js)**
- ✅ Added GROQ_API_KEY validation with clear error messaging
- ✅ Enhanced error handling with detailed console logging
- ✅ Added input validation for user preferences
- ✅ Improved JSON parsing with markdown cleanup
- ✅ Added response structure validation
- ✅ Better tour data formatting for AI context

### 3. **Environment Configuration**
- ✅ Created `.env.example` template file

---

## 🔧 Required Setup Steps

### Step 1: Get Groq API Key
1. Visit https://console.groq.com/
2. Sign up or log in with your account
3. Go to API Keys section
4. Create a new API key
5. Copy the key (starts with `gsk_`)

### Step 2: Set Environment Variables
1. In the **Backend** folder, create a `.env` file (copy from `.env.example`)
2. Add your values:

```env
# MongoDB Connection (use your connection string)
MONGODB_URI=mongodb://localhost:27017/travlystiq

# JWT Secret (create a secure random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Groq API Key (from Step 1)
GROQ_API_KEY=gsk_your_actual_key_here

# Environment
NODE_ENV=development
```

### Step 3: Restart Backend Server
```bash
cd Backend
npm install  # if groq-sdk not installed
npm start
```

### Step 4: Test the AI Planner
1. Make sure you're logged in on the frontend
2. Go to the home page and find the "AI Tour Planner" section
3. Type a preference like: "I want a budget peaceful trip to mountains for 5 days"
4. Click "Plan My Trip"

---

## 🐛 Troubleshooting

### Issue: "AI service not configured"
**Solution:** Make sure `GROQ_API_KEY` is set in your `.env` file

### Issue: "Please provide a valid preference"
**Solution:** Enter a description of your travel preferences

### Issue: "No tours available for recommendation"
**Solution:** Upload tours data first. Run:
```bash
cd Backend
node data/uploaderTours.js
```

### Issue: "Invalid or expired token"
**Solution:** You need to be logged in to use AI features. Log in first, then try again.

### Issue: "AI error: Try again later"
**Solution:** 
- Check if GROQ_API_KEY is valid
- Check backend console for error details
- Ensure you have internet connection

---

## 📝 How It Works

1. **Frontend:** User enters travel preferences
2. **Backend:** Request sent to protected route `/api/v1/users/ai-recommend`
3. **Authentication:** JWT token verified
4. **Database:** All tours fetched
5. **AI Processing:** Groq LLaMA 3 model processes request and returns recommendation
6. **Response:** Returns Tour ID, reason, and 3-day itinerary
7. **Frontend:** Displays recommendation with option to view tour details

---

## ✨ Features

- AI-powered tour recommendations
- Personalized 3-day itineraries
- Smart matching based on user preferences
- One-click navigation to tour details
- Proper error handling and user feedback

---

## 📞 Support

If you encounter issues:
1. Check backend console for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running
4. Make sure tours data is uploaded
5. Verify JWT token is valid and not expired
