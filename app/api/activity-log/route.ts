import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function GET() {
  return NextResponse.json(await store.getActivityLog())
}

export async function DELETE() {
  await store.clearActivityLog()
  return NextResponse.json({ success: true })
}
