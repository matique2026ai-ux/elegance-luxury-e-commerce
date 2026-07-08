import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"
import crypto from "crypto"

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

// POST /api/auth?action=login or POST /api/auth?action=register
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action") || "login"
    const body = await request.json()

    if (action === "register") {
      const { name, email, password } = body
      if (!name || !email || !password) {
        return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
      }
      if (password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
      }
      const user = store.createUser(name, email, hashPassword(password))
      if (!user) {
        return NextResponse.json({ error: "Email already registered" }, { status: 409 })
      }
      const token = crypto.randomUUID()
      return NextResponse.json({ user, token })
    }

    if (action === "login") {
      const { email, password } = body
      if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
      }
      const user = store.getUserByEmail(email)
      if (!user || user.password !== hashPassword(password)) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }
      const token = crypto.randomUUID()
      return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email }, token })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 })
  }
}
