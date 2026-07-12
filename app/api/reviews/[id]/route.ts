import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function PATCH(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id)
  await store.approveReview(id)
  return NextResponse.json({ success: true })
}
