import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id)
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get("lang")
  const product = await store.getProduct(id, lang || undefined)
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })
  return NextResponse.json(product)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id)
  const body = await request.json()
  const updated = await store.updateProduct(id, body)
  if (!updated) return NextResponse.json({ error: "Product not found" }, { status: 404 })
  await store.logActivity("update", "product", String(id), `Updated product "${updated.name_en}"`)
  return NextResponse.json(updated)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id)
  const product = await store.getProduct(id)
  await store.deleteProduct(id)
  await store.logActivity("delete", "product", String(id), `Deleted product "${product?.name_en || id}"`)
  return NextResponse.json({ success: true })
}
