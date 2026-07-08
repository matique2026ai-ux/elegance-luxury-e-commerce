import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id)
  const body = await request.json()
  const updated = store.updateProduct(id, body)
  if (!updated) return NextResponse.json({ error: "Product not found" }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id)
  store.deleteProduct(id)
  return NextResponse.json({ success: true })
}
