import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, date, message } = body
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }
    store.addAppointment({ name, email, phone, date, message })
    return NextResponse.json({ success: true, message: "Appointment request received" })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(await store.getAppointments())
}
