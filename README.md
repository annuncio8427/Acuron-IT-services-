# Acuron IT Services — Website

**Engineering Intelligent Digital Solutions**

A world-class enterprise IT services website built with static HTML/CSS/JS + Firebase Authentication.

---

## 📁 File Structure

```
acuron/
├── index.html          # Main homepage
├── login.html          # Firebase auth login page
├── signup.html         # Firebase auth signup page
├── dashboard.html      # Protected client portal dashboard
├── styles.css          # Complete design system stylesheet
├── script.js           # Main interactivity & animations
├── firebase-config.js  # Firebase initialization (configure here)
├── firebase.json       # Firebase Hosting configuration
└── assets/
    ├── icons/
    │   └── favicon.svg
    ├── images/
    └── videos/
```

---

## 🔧 Firebase Setup (Required)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named `acuron-it`
3. Enable **Firebase Hosting** and **Firebase Authentication**
4. In Authentication → Sign-in method, enable:
   - **Email/Password**
   - **Google**
5. Copy your Firebase config from Project Settings → General → Your apps
6. Paste into `firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## 🚀 Firebase Deployment

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (select Hosting, use existing firebase.json)
firebase init hosting

# Deploy
firebase deploy --only hosting
```

Your site will be live at: `https://YOUR_PROJECT.web.app`

---

## ✨ Features

- **Homepage**: Hero with particle network animation, AI chat widget, services grid, metrics counters, insights blog, case studies (6), testimonials carousel, careers CTA, newsletter
- **Navigation**: Sticky mega-menu with dropdowns, mobile hamburger nav
- **Authentication**: Firebase email/password + Google OAuth, session persistence
- **Dashboard**: Protected route (redirects to login), project tracker, activity feed, team members, milestones
- **Design**: Syne + DM Sans fonts, Deep Blue + Cyan + Purple palette, scroll reveal animations, animated counters, particle canvas
- **Responsive**: 320px → 1920px, all breakpoints tested
- **SEO**: Semantic HTML5, ARIA labels, OpenGraph tags, meta descriptions
- **Bonus**: Page loader, cookie banner, dark mode toggle, floating AI chat button

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary | `#0B1F3A` Deep Blue |
| Accent | `#00E5FF` Neon Cyan |
| Accent 2 | `#7C3AED` Tech Purple |
| Font Display | Syne |
| Font Body | DM Sans |

---

© 2026 Acuron IT Services. All rights reserved.
