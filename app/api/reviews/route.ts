import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get("productId")
  return NextResponse.json(await store.getReviews(productId ? Number(productId) : undefined))
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    if (!data.productId || !data.userName || !data.rating) {
      return NextResponse.json({ error: "productId, userName, rating are required" }, { status: 400 })
    }
    const review = await store.addReview(data)
    return NextResponse.json(review)
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 })
  await store.deleteReview(Number(id))
  return NextResponse.json({ success: true })
}
