import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { store } from "@/lib/data-store"

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies()
    const userEmail = cookieStore.get("user_email")?.value
    if (!userEmail) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

    const body = await request.json()
    const { name } = body
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 })
    }

    await store.updateUserName(userEmail, name.trim())

    const response = NextResponse.json({ success: true, name: name.trim() })
    response.cookies.set("user_name", name.trim(), { secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 })
    return response
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
