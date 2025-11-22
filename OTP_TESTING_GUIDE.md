# OTP Signup Flow - Testing Checklist

## ✅ System Status

- Backend Server: Running on port 3000 ✅
- Frontend Server: Running on port 5174 ✅
- MongoDB: Connected ✅

## 📋 Testing Steps

### Step 1: Access Registration Page

**URL:** http://localhost:5174/register

You should see:

- ✅ "Create an Account" header
- ✅ Input fields for: Name, Email, Password, Confirm Password
- ✅ "Create an account" button

---

### Step 2: Fill Registration Form

Enter the following test data:

```
Name: Test User
Email: your_email@gmail.com (use YOUR actual Gmail)
Password: password123
Confirm Password: password123
```

⚠️ **IMPORTANT:** Use your real email address so you can receive the OTP!

---

### Step 3: Click "Create an Account"

**What should happen:**

✅ You should see a toast notification at the top:

```
"OTP sent to your email! Please verify to complete registration."
```

✅ After 2-3 seconds, you should be automatically redirected to:

```
http://localhost:5174/verify-otp
```

---

### Step 4: OTP Verification Page

You should now see:

- ✅ Large email icon at the top
- ✅ "Verify Your Email" heading
- ✅ Message: "We've sent a 6-digit OTP to: your_email@gmail.com"
- ✅ 6-digit input field (shows "000000" as placeholder)
- ✅ "OTP expires in: 10:00" countdown timer
- ✅ "Verify OTP" button
- ✅ "Didn't receive the OTP? Resend" link
- ✅ "Back to Registration" link

---

### Step 5: Check Your Email

**Check your inbox (and spam folder) for:**

📧 Email from: your_configured_MAIL_USER (from .env)
📧 Subject: "Email Verification - Travlystiq OTP"

You should see:

- ✅ A large **6-digit OTP number** (e.g., 123456)
- ✅ Message: "This OTP will expire in 10 minutes"
- ✅ Travlystiq branding

---

### Step 6: Enter OTP on Frontend

1. Copy the 6-digit OTP from the email
2. On the OTP page, click in the input field
3. Paste or type the 6-digit OTP
4. You should see the input field auto-fill or display your OTP

---

### Step 7: Click "Verify OTP"

**What should happen:**

✅ Button should show: "Verifying..." while processing

✅ After verification succeeds, you should see:

```
"Email verified successfully!"
```

✅ You should be redirected to the Login page:

```
http://localhost:5174/login
```

---

### Step 8: Login with Verified Account

Now log in with your credentials:

```
Email: your_email@gmail.com
Password: password123
```

You should:
✅ See success toast: "Login successful"
✅ Be redirected to home page
✅ See "My Bookings" link in the navbar (top right dropdown)
✅ Your name should appear in the navbar

---

## 🐛 Troubleshooting

### Issue: OTP page shows "Back to Registration" immediately

**Solution:** Make sure you're being redirected FROM the register page. Don't access `/verify-otp` directly - always go through the registration flow.

### Issue: Email not received

1. **Check spam/promotions folder** in Gmail
2. **Verify .env configuration:**
   ```
   MAIL_SERVICE=gmail
   MAIL_USER=your_email@gmail.com
   MAIL_PASSWORD=your_16_char_app_password
   ```
3. **Check backend console** for email errors
4. **Confirm Gmail 2FA is enabled** and you have an App Password (not regular password)

### Issue: OTP is invalid or expired

- **Each OTP is valid for 10 minutes only**
- **Each signup attempt generates a NEW OTP**
- Make sure you're entering the OTP from the LATEST email received

### Issue: "OTP sent to your email" toast doesn't appear

1. Check browser console (F12) for errors
2. Check backend console for email sending errors
3. Verify MAIL_USER and MAIL_PASSWORD in Backend/.env

### Issue: Redirects to registration page on OTP page

This means the email state wasn't passed. Make sure:

- You came from the Register page (not direct URL access)
- Navigate object is working properly
- useLocation hook is reading the state correctly

---

## ✨ Success Indicators

If you see ALL of these, the OTP flow is working perfectly:

- [ ] Registration form filled and submitted
- [ ] Toast: "OTP sent to your email!"
- [ ] Redirected to /verify-otp page automatically
- [ ] Email received with 6-digit OTP
- [ ] OTP input accepted
- [ ] Verification successful
- [ ] Redirected to /login
- [ ] Can login with registered credentials
- [ ] "My Bookings" appears in navbar after login

---

## 📝 Notes

- Each OTP is **6 digits**
- Each OTP expires in **10 minutes**
- OTPs are sent via **Gmail SMTP**
- After verification, you're auto-logged in (receive JWT token)
- Unverified users are deleted if they try to register again with same email

---

## Backend API Reference

### Register Endpoint

```
POST /api/v1/users/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@gmail.com",
  "password": "password123",
  "confirmPassword": "password123"
}

Response (201):
{
  "message": "OTP sent to your email. Please verify your email to complete registration.",
  "email": "test@gmail.com",
  "userId": "..."
}
```

### Verify OTP Endpoint

```
POST /api/v1/users/verify-otp
Content-Type: application/json

{
  "email": "test@gmail.com",
  "otp": "123456"
}

Response (200):
{
  "message": "Email verified successfully. Registration complete!",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@gmail.com",
    "role": "user",
    "photo": "default.jpg"
  }
}
```
