"use client"

import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

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
  const { t } = useI18n()
  const d = t.dashboard.orders

  useEffect(() => {
    fetch("/api/orders").then(r => r.json()).then(setOrders)
  }, [])

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: status as Order["status"] } : o))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">{d.heading}</h1>
        <a href="/api/export?type=orders" className="p-2 hover:bg-secondary/50 transition-colors border border-border flex items-center gap-2 text-sm" download><Download className="w-4 h-4" /> CSV</a>
      </div>

      <div className="space-y-4">
        {orders.length === 0 && (
          <p className="text-center text-muted-foreground py-12">{d.noOrders}</p>
        )}
        {orders.map((o) => (
          <div key={o.id} className="bg-card border border-border p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs text-muted-foreground">{d.orderPrefix}{o.id}</span>
                <p className="font-medium">{o.customer.name}</p>
                <p className="text-sm text-muted-foreground">{o.customer.phone} — {o.customer.wilaya}, {o.customer.commune}</p>
              </div>
              <div className="flex items-center gap-4">
                  <select
                    value={o.status}
                    onChange={e => updateStatus(o.id, e.target.value)}
                    className={"text-[10px] tracking-[0.1em] uppercase px-3 py-1 border border-border bg-background cursor-pointer " + statusColors[o.status]}
                  >
                    <option value="pending">{d.statusLabels.pending}</option>
                    <option value="confirmed">{d.statusLabels.confirmed}</option>
                    <option value="shipped">{d.statusLabels.shipped}</option>
                    <option value="delivered">{d.statusLabels.delivered}</option>
                    <option value="cancelled">{d.statusLabels.cancelled}</option>
                  </select>
                <span className="font-serif text-xl text-accent">{o.grandTotal.toLocaleString()} DZD</span>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground text-[10px] tracking-[0.2em] uppercase">
                    <th className="pb-2">{d.table.item}</th>
                    <th className="pb-2">{d.table.category}</th>
                    <th className="pb-2">{d.table.qty}</th>
                    <th className="pb-2 text-right">{d.table.price}</th>
                  </tr>
                </thead>
                <tbody>
                  {o.items.map((item, i) => (
                    <tr key={i} className="border-t border-border/50">
                      <td className="py-2">{item.name}</td>
                      <td className="py-2 text-muted-foreground">{item.category}</td>
                      <td className="py-2">{item.quantity}</td>
                      <td className="py-2 text-right">{(item.price * item.quantity).toLocaleString()} DZD</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-border">
                    <td colSpan={3} className="py-2 text-right text-muted-foreground">{d.shipping}</td>
                    <td className="py-2 text-right">{o.shippingPrice.toLocaleString()} DZD</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="py-2 text-right font-medium">{d.total}</td>
                    <td className="py-2 text-right font-serif text-lg text-accent">{o.grandTotal.toLocaleString()} DZD</td>
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
