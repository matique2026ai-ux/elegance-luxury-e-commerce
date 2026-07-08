import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get("page")
  if (page) return NextResponse.json(store.getContent(page))
  return NextResponse.json(store.getAllContent())
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body.page) {
      return NextResponse.json({ error: "Page is required" }, { status: 400 })
    }
    store.updateContent(body.page, body)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
