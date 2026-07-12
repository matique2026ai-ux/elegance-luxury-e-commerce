import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function GET() {
  return NextResponse.json(await store.getAllUsers())
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 })
    await store.deleteUser(Number(id))
    await store.logActivity("delete", "user", String(id), `Deleted user #${id}`)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
