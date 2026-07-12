import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id)
  const data = await request.json()
  await store.updateCoupon(id, data)
  return NextResponse.json({ success: true })
}
