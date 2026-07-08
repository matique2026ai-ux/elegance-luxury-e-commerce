import { NextResponse } from "next/server"
import { store, type Order } from "@/lib/data-store"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, total, shippingPrice, grandTotal, customer } = body
    if (!items?.length || !customer?.name || !customer?.phone || !customer?.wilaya) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    store.addOrder({ items, total, shippingPrice, grandTotal, customer })
    return NextResponse.json({ success: true, message: "Order placed successfully" })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(store.getOrders())
}
