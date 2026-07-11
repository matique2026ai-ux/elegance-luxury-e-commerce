import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"
import { sendEmail } from "@/lib/email"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    const user = await store.getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "No account found with this email" }, { status: 404 })
    }

    const code = crypto.randomInt(100000, 999999).toString()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()
    await store.createResetCode(email, code, expiresAt)

    sendEmail({
      to: email,
      subject: "Password Reset - MAISON HERAHIMA",
      html: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto">
        <h2 style="color:#1a1a1a">Password Reset</h2>
        <p style="color:#666">Use this code to reset your password. It expires in 15 minutes.</p>
        <div style="font-size:32px;letter-spacing:8px;text-align:center;padding:24px;background:#f5f5f5;margin:24px 0;font-family:monospace">${code}</div>
        <p style="color:#999;font-size:12px">If you didn't request this, ignore this email.</p>
      </div>`
    })

    return NextResponse.json({ success: true, message: "Reset code sent", code: code })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
