import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function GET() {
  return NextResponse.json(await store.getSettings())
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    await store.updateSettings(data)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
