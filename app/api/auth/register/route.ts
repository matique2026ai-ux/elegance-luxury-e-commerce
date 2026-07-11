import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }
    const hash = crypto.createHash("sha256").update(password).digest("hex")
    const user = await store.createUser(name, email, hash)
    if (!user) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
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
