import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const { email, code, password } = await request.json()
    if (!email || !code || !password) {
      return NextResponse.json({ error: "Email, code, and new password are required" }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const valid = await store.verifyResetCode(email, code)
    if (!valid) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")
    await store.updatePassword(email, hash)

    return NextResponse.json({ success: true, message: "Password updated successfully" })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
