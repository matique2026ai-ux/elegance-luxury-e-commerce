import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const valid = process.env.DASHBOARD_PASSWORD || "herahma2026"
    if (password === valid) {
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 })
  }
}
