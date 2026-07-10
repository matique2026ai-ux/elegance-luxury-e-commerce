import { NextResponse } from "next/server"
import { store, type Order } from "@/lib/data-store"

const statusMessages: Record<string, { subject: string; body: string }> = {
  confirmed: {
    subject: "Order Confirmed - MAISON HERAHIMA",
    body: "Your order has been confirmed! We are preparing your items and will notify you when they ship.",
  },
  shipped: {
    subject: "Order Shipped - MAISON HERAHIMA",
    body: "Your order has been shipped! You can expect delivery within 3-5 business days.",
  },
  delivered: {
    subject: "Order Delivered - MAISON HERAHIMA",
    body: "Your order has been delivered. We hope you love your pieces!",
  },
  cancelled: {
    subject: "Order Cancelled - MAISON HERAHIMA",
    body: "Your order has been cancelled. If you have any questions, please contact us.",
  },
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body
    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }
    await store.updateOrderStatus(id, status)

    const msg = statusMessages[status]
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey && msg) {
      const orders = await store.getOrders()
      const order = orders.find(o => o.id === id)
      if (order?.customer?.email) {
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "MAISON HERAHIMA <onboarding@resend.dev>",
            to: [order.customer.email],
            subject: msg.subject,
            html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
              <h2 style="color:#1a1a1a">${msg.subject}</h2>
              <p style="color:#666">${msg.body}</p>
              <p style="color:#666;font-size:14px">Order: ${id}</p>
            </div>`
          }),
        }).catch(() => {})
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}