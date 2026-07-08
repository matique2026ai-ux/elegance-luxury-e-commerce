"use client"

import { useEffect, useState } from "react"

interface Order {
  id: string
  items: { id: number; name: string; price: number; quantity: number; category: string }[]
  total: number
  shippingPrice: number
  grandTotal: number
  customer: { name: string; phone: string; wilaya: string; commune: string; address: string }
  createdAt: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-rose-100 text-rose-700",
}

export default function DashboardOrders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetch("/api/orders").then(r => r.json()).then(setOrders)
  }, [])

  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-8">Orders</h1>

      <div className="space-y-4">
        {orders.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No orders yet.</p>
        )}
        {orders.map((o) => (
          <div key={o.id} className="bg-card border border-border p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs text-muted-foreground">Order #{o.id}</span>
                <p className="font-medium">{o.customer.name}</p>
                <p className="text-sm text-muted-foreground">{o.customer.phone} — {o.customer.wilaya}, {o.customer.commune}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`inline-block px-3 py-1 text-[10px] tracking-[0.1em] uppercase ${statusColors[o.status]}`}>
                  {o.status}
                </span>
                <span className="font-serif text-xl text-accent">${o.grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground text-[10px] tracking-[0.2em] uppercase">
                    <th className="pb-2">Item</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Qty</th>
                    <th className="pb-2 text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {o.items.map((item, i) => (
                    <tr key={i} className="border-t border-border/50">
                      <td className="py-2">{item.name}</td>
                      <td className="py-2 text-muted-foreground">{item.category}</td>
                      <td className="py-2">{item.quantity}</td>
                      <td className="py-2 text-right">${(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-border">
                    <td colSpan={3} className="py-2 text-right text-muted-foreground">Shipping</td>
                    <td className="py-2 text-right">${o.shippingPrice.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="py-2 text-right font-medium">Total</td>
                    <td className="py-2 text-right font-serif text-lg text-accent">${o.grandTotal.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <p className="text-xs text-muted-foreground mt-4">{new Date(o.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
