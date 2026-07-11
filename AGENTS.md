# MAISON HERAHIMA — State Handover

## Current Status
- Full multi-language Next.js e-commerce (EN/FR/AR)
- Supabase PostgreSQL with products, content, users, orders, appointments, messages, subscribers
- Admin dashboard with password auth (herahma2026)
- Cart, favorites, user auth contexts
- RTL support for Arabic

## Email Configuration
The app can send emails via either SMTP or Resend.
Set ONE of these in Vercel env vars:

### Option 1: SMTP (recommended for Gmail/Outlook)
- `SMTP_HOST` — e.g., smtp.gmail.com
- `SMTP_PORT` — 587 (default)
- `SMTP_SECURE` — "true" for 465, "false" for 587
- `SMTP_USER` — your full email
- `SMTP_PASS` — app password (enable 2FA, generate app-specific password)
- `SMTP_FROM` — sender address (optional, defaults to SMTP_USER)

### Option 2: Resend
- `RESEND_API_KEY` — Resend API key

## Features
- User registration/login with SHA-256 hashed passwords
- Forgot password with 6-digit reset code (15 min expiry, stored in password_resets table)
- Order confirmation email when customer places order
- Status update emails (confirmed/shipped/delivered/cancelled)

## API Endpoints
- `POST /api/auth/register` — create account
- `POST /api/auth/login` — sign in
- `GET /api/auth/user` — check session
- `POST /api/auth/logout/user` — sign out
- `PUT /api/auth/profile` — update name
- `POST /api/auth/forgot-password` — request reset code
- `POST /api/auth/reset-password` — reset with code

## Deploy
- Vercel: https://herahima.vercel.app
- `npm run build` succeeds with 0 errors
- Supabase project: sfufsmiphykebgumpsqm (eu-west-3 Paris)
