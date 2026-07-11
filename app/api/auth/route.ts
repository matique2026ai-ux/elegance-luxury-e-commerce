import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import crypto from "crypto"

const DASHBOARD_PASSWORD_HASH = crypto.createHash("sha256").update("herahma2026").digest("hex")

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body
    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 })
    }
    const hash = crypto.createHash("sha256").update(password).digest("hex")
    if (hash !== DASHBOARD_PASSWORD_HASH) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 })
    }
    const cookieStore = await cookies()
    const token = crypto.randomUUID()
    cookieStore.set("dashboard_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 })
  }
}

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("dashboard_token")?.value
  if (!token) {
    return NextResponse.json({ authed: false }, { status: 401 })
  }
  return NextResponse.json({ authed: true })
}
