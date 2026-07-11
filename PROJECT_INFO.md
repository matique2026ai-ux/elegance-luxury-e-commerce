# MAISON HERAHIMA — Project Information

## Links
- **Live Site:** https://herahima.vercel.app
- **Dashboard:** https://herahima.vercel.app/dashboard
- **GitHub Repo:** https://github.com/matique2026ai-ux/elegance-luxury-e-commerce
- **Vercel Dashboard:** https://vercel.com/matique2026ai-7300s-projects

## Credentials
- **Dashboard Password:** `herahma2026`
- **Vercel Account:** (your GitHub account — matique2026ai-ux)
- **Supabase Account:** (your GitHub account)
- **Supabase Project:** herahima
- **GitHub Token (Netlify):** nfp_vMo6RcKteboWRwVFjc8VY8SbB8iR9Zvi20b7 (saved in this session)

## Tech Stack
- **Framework:** Next.js 16 (React 19)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL) — persistent
- **Styling:** Tailwind CSS v4 + Radix UI (shadcn/ui)
- **Hosting:** Vercel (Free Hobby plan)
- **Languages:** English / French / Arabic (RTL)
- **Fonts:** DM Sans, Playfair Display, Noto Kufi Arabic

## Local Development
```bash
cd "C:\Users\PCIB\Desktop\landing page founoun\elegance-luxury-e-commerce"
npm run dev
```
Then open http://localhost:3000

## Build
```bash
npm run build
```

## Deployment
- Vercel auto-deploys from GitHub (`main` branch)
- To trigger: push to `main` or go to Vercel dashboard → Deploy

## Key Folders
- `app/` — All pages and API routes
- `components/` — UI components (header, footer, cart, etc.)
- `context/` — Cart + Favorites contexts (saved in localStorage)
- `lib/` — Database, translations (en/fr/ar), utilities
- `lib/db.ts` — In-memory JSON store (fallback) + Supabase client

## Features
- Multi-language (EN/FR/AR) with RTL for Arabic
- Shopping cart with localStorage persistence
- Favorites/Wishlist
- Product search (dynamic)
- Checkout with wilaya/commune selection
- Admin Dashboard (password: herahma2026)
- Order management with status updates
- Email notifications (via Resend — needs RESEND_API_KEY env var)
- Stock management (auto-decrement on order)
- Responsive design (mobile + desktop)

## Environment Variables (to add in Vercel)
Required for email notifications and database persistence:
- `RESEND_API_KEY` — for order confirmation emails
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_ANON_KEY` — Supabase anon public key

## Supabase
- URL: (obtain from Supabase dashboard → Project Settings → API)
- Anon Key: (obtain from Supabase dashboard → Project Settings → API)
- Tables will be created automatically by the app

## Notes
- Dashboard password is stored in code (`lib/api/auth/route.ts` — DASHBOARD_PASSWORD_HASH)
- To change password: update the password in that file and redeploy
- Data is currently in-memory (resets on server restart). To persist: add Supabase env vars
