import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }
    const added = await store.addSubscriber(email)
    if (!added) {
      return NextResponse.json({ error: "Already subscribed" }, { status: 409 })
    }
    return NextResponse.json({ success: true, message: "Subscribed successfully" })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(await store.getSubscribers())
}
