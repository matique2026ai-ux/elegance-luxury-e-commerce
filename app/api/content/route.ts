import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get("page")
  const lang = searchParams.get("lang")
  if (page) return NextResponse.json(await store.getContent(page, lang || undefined))
  return NextResponse.json(await store.getAllContent(lang || undefined))
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body.page) {
      return NextResponse.json({ error: "Page is required" }, { status: 400 })
    }
    await store.updateContent(body.page, body)
    await store.logActivity("update", "content", body.page, `Updated content for "${body.page}"`)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
