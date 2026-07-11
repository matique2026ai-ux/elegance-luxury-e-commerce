# MAISON HERAHIMA — Project Information

## Links
- **Live Site:** https://herahima.vercel.app
- **Dashboard:** https://herahima.vercel.app/dashboard
- **GitHub Repo:** https://github.com/matique2026ai-ux/elegance-luxury-e-commerce
- **Vercel Dashboard:** https://vercel.com/matique2026ai-ux/herahima

## Credentials
- **Dashboard Password:** `herahma2026`
- **Supabase Project:** herahima (ref: sfufsmiphykebgumpsqm, region: eu-west-3 Paris)

## Tech Stack
- **Framework:** Next.js 16 (React 19)
- **Language:** TypeScript
- **Database:** Supabase PostgreSQL (persistent)
- **Styling:** Tailwind CSS v4 + Radix UI (shadcn/ui)
- **Hosting:** Vercel (Free Hobby plan)
- **Languages:** English / French / Arabic (RTL)
- **Fonts:** DM Sans, Playfair Display, Noto Kufi Arabic
- **Email:** SMTP (any provider) or Resend

## Local Development
```bash
cd "C:\Users\PCIB\Desktop\elegance-luxury-e-commerce"
npm run dev
```
Then open http://localhost:3000

## Build
```bash
npm run build
```

## Deployment
- Vercel auto-deploys from GitHub (`main` branch)

## Features
- Multi-language (EN/FR/AR) with RTL for Arabic
- Shopping cart with localStorage persistence
- Favorites/Wishlist
- Product search (dynamic)
- Checkout with wilaya/commune selection (58 wilayas)
- Admin Dashboard with order/product/content management
- Order management with status updates (email notified)
- User registration / login / forgot password
- Stock management (auto-decrement on order)
- Responsive design (mobile + desktop)
- Email notifications: order confirmation, status updates, password reset

## API Endpoints
- `POST /api/auth/register` — create account
- `POST /api/auth/login` — sign in
- `GET /api/auth/user` — check session
- `POST /api/auth/logout/user` — sign out
- `PUT /api/auth/profile` — update name
- `POST /api/auth/forgot-password` — request reset code
- `POST /api/auth/reset-password` — reset with code
- `POST /api/orders` — place order
- `GET /api/orders?email=xxx` — get orders by email

## Email Configuration (Vercel env vars)

### Option 1: SMTP (Gmail — free)
- `SMTP_HOST` = smtp.gmail.com
- `SMTP_PORT` = 587
- `SMTP_USER` = your@gmail.com
- `SMTP_PASS` = Gmail App Password (requires 2FA)

### Option 2: SMTP (any provider)
- `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM`

### Option 3: Resend
- `RESEND_API_KEY`

## Supabase Tables
- `products` — Products with multi-language names (name_en, name_fr, name_ar)
- `page_content` — Page content with multi-language fields
- `users` — User accounts (password hashed with SHA-256)
- `orders` — Orders with items JSON, customer JSON, status
- `appointments` — Appointment requests
- `subscribers` — Newsletter subscribers
- `contacts` — Contact form messages
- `password_resets` — Password reset codes (auto-expire 15 min)

## Notes
- Dashboard password is hashed in `app/api/auth/route.ts`
- To change dashboard password: update the SHA-256 hash in that file
- User passwords are SHA-256 hashed before storage
- Reset codes expire after 15 minutes and are single-use
- The `cart-drawer.tsx` cards may blend with background — uses `bg-secondary/10 border-border/80`
