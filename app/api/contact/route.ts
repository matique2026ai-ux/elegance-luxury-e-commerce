import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }
    store.addMessage({ name, email, subject, message })
    return NextResponse.json({ success: true, message: "Message received" })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(store.getMessages())
}
