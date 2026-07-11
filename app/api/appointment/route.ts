import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, date, message } = body
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }
    await store.addAppointment({ name, email, phone, date, message })
    return NextResponse.json({ success: true, message: "Appointment request received" })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(await store.getAppointments())
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body
    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required" }, { status: 400 })
    }
    await store.updateAppointmentStatus(id, status)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 })
    await store.deleteAppointment(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
