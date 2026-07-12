import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function GET() {
  try {
    const stats = await store.getStats()
    return NextResponse.json(stats)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
