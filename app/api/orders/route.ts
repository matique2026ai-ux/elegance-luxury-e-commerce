import { NextResponse } from "next/server"
import { store, type Order } from "@/lib/data-store"
import { sendEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, total, shippingPrice, grandTotal, customer } = body
    if (!items?.length || !customer?.name || !customer?.phone || !customer?.wilaya) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    await store.addOrder({ items, total, shippingPrice, grandTotal, customer })

    if (customer.email) {
      const itemsHtml = items.map((i: any) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e5e5">${i.name}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e5e5;text-align:center">${i.quantity}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e5e5;text-align:right">${(i.price * i.quantity).toLocaleString()} DZD</td></tr>`
      ).join("")
      sendEmail({
        to: customer.email,
        subject: "Order Confirmation - MAISON HERAHIMA",
        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#1a1a1a">Thank you for your order!</h2>
          <p style="color:#666">Your order has been received. We will contact you within 24 hours to confirm delivery.</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0">
            <tr><th style="text-align:left;padding:8px 12px;border-bottom:2px solid #1a1a1a">Item</th><th style="padding:8px 12px;border-bottom:2px solid #1a1a1a;text-align:center">Qty</th><th style="padding:8px 12px;border-bottom:2px solid #1a1a1a;text-align:right">Price</th></tr>
            ${itemsHtml}
          </table>
          <p style="font-size:18px;font-weight:bold;text-align:right">Total: ${grandTotal.toLocaleString()} DZD</p>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:20px 0"/>
          <p style="color:#666;font-size:14px"><strong>Delivery to:</strong> ${customer.name}, ${customer.wilaya}, ${customer.commune}, ${customer.address}</p>
        </div>`
      })
    }

    return NextResponse.json({ success: true, message: "Order placed successfully" })
  } catch (e: any) {
    const msg = e?.message || "Internal server error"
    const status = msg.includes("stock") || msg.includes("not found") ? 409 : 500
    return NextResponse.json({ error: msg }, { status })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email")
  const orders = await store.getOrders()
  if (email) {
    return NextResponse.json(orders.filter(o => o.customer.email?.toLowerCase() === email.toLowerCase()))
  }
  return NextResponse.json(orders)
}
