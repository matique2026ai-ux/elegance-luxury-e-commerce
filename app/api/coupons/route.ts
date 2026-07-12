import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function GET() {
  return NextResponse.json(await store.getCoupons())
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    if (!data.code) return NextResponse.json({ error: "Code is required" }, { status: 400 })
    const ok = await store.addCoupon({
      code: data.code.toUpperCase(),
      discountType: data.discountType || "percentage",
      discountValue: Number(data.discountValue) || 0,
      minOrder: Number(data.minOrder) || 0,
      maxUses: Number(data.maxUses) || 0,
      expiresAt: data.expiresAt || "",
      active: data.active !== undefined ? (data.active ? 1 : 0) : 1,
    })
    if (!ok) return NextResponse.json({ error: "Coupon code already exists" }, { status: 409 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 })
  await store.deleteCoupon(Number(id))
  return NextResponse.json({ success: true })
}
