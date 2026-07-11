import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }
    const hash = crypto.createHash("sha256").update(password).digest("hex")
    const user = await store.getUserByEmail(email)
    if (!user || user.password !== hash) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }
    const token = crypto.randomUUID()
    const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
    response.cookies.set("user_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 })
    response.cookies.set("user_name", user.name, { secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 })
    response.cookies.set("user_email", user.email, { secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 })
    return response
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
