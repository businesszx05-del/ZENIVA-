# ZENIVA – All-in-One Gallery App

## Overview
ZENIVA is a mobile-first, PWA-ready gallery application with full admin control. It supports:
- 🖼️ Wallpapers (Couple, Dark AMOLED, Cute Animals, Nature, Islamic, Quotes)
- 🎴 Wishes Cards (Birthday, Eid, Anniversary)
- 👤 DPs (Boys & Girls Stylish)
- 🩷 Stickers (Dudu Bubu, Funny & Memes, Islamic Text)

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL via Drizzle ORM
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.example` to `.env` and fill in your values:
```
DATABASE_URL=postgresql://user:password@localhost:5432/zeniva_db
ADMIN_PASSWORD=secret 
```

### 3. Push database schema
```bash
npx drizzle-kit push
```

### 4. Run development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
npm start
```

## Admin Panel
- Tap the ⚙️ **Admin** button on the Home screen
- Enter password: `secret`
- Use the dashboard to:
  - Select Main Category & Sub-Category
  - Enter a Title/Name
  - Paste a GitHub Raw Link (or any direct image URL)
  - Click **Add Item**
  - Items instantly appear in the user gallery
  - Delete any item from the live list at the bottom

## How to Get GitHub Raw Links
1. Upload your image to a GitHub repository
2. Navigate to the image file on GitHub
3. Click the **Raw** button
4. Copy the URL — it looks like:
   `https://raw.githubusercontent.com/username/repo/main/image.jpg`
5. Paste it in the Admin Panel

## Features
- ✅ Splash screen with animated logo
- ✅ 4 main categories with sub-categories
- ✅ Full-screen image viewer
- ✅ Download to gallery
- ✅ Share via WhatsApp / social media (Web Share API)
- ✅ Admin panel with password protection
- ✅ Add / Delete items in real-time
- ✅ PWA-ready (installable on mobile)
- ✅ Dark AMOLED-friendly UI
