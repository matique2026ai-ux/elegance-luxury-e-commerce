"use client"

import { useEffect, useState } from "react"
import { TrendingUp, DollarSign, ShoppingBag, Clock, AlertCircle, CheckCircle, Truck, PackageCheck, XCircle, Download } from "lucide-react"

interface Analytics {
  totalRevenue: number
  totalOrders: number
  avgOrderValue: number
  monthlyRevenue: { month: string; revenue: number; orders: number }[]
  recentOrders: { id: string; grandTotal: number; status: string; createdAt: string; customer: string }[]
  ordersByStatus: { pending: number; confirmed: number; shipped: number; delivered: number; cancelled: number }
  ordersToday: number
  revenueToday: number
}

export default function AnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null)

  useEffect(() => {
    fetch("/api/analytics").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="text-muted-foreground">Loading...</div>

  const maxRevenue = Math.max(...data.monthlyRevenue.map(m => m.revenue), 1)

  const statusIcons: Record<string, { icon: any; color: string }> = {
    pending: { icon: Clock, color: "text-amber-600 bg-amber-100" },
    confirmed: { icon: CheckCircle, color: "text-blue-600 bg-blue-100" },
    shipped: { icon: Truck, color: "text-indigo-600 bg-indigo-100" },
    delivered: { icon: PackageCheck, color: "text-emerald-600 bg-emerald-100" },
    cancelled: { icon: XCircle, color: "text-red-600 bg-red-100" },
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">Analytics</h1>
        <div className="flex gap-2">
          <a href="/api/export?type=orders" className="p-2 hover:bg-secondary/50 transition-colors border border-border flex items-center gap-2 text-sm" download><Download className="w-4 h-4" /> Orders CSV</a>
          <a href="/api/export?type=activity" className="p-2 hover:bg-secondary/50 transition-colors border border-border flex items-center gap-2 text-sm" download><Download className="w-4 h-4" /> Activity CSV</a>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Revenue", value: `$${data.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600 bg-emerald-100" },
          { label: "Total Orders", value: data.totalOrders, icon: ShoppingBag, color: "text-blue-600 bg-blue-100" },
          { label: "Avg Order Value", value: `$${data.avgOrderValue.toFixed(0)}`, icon: TrendingUp, color: "text-indigo-600 bg-indigo-100" },
          { label: "Today", value: `$${data.revenueToday} (${data.ordersToday})`, icon: Clock, color: "text-amber-600 bg-amber-100" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card border border-border p-4">
            <div className={`w-8 h-8 flex items-center justify-center ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-xl font-serif mt-2">{typeof value === "number" ? value.toLocaleString() : value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-card border border-border p-6">
          <h2 className="font-serif text-lg mb-4">Monthly Revenue ({new Date().getFullYear()})</h2>
          <div className="flex items-end gap-2 h-40">
            {data.monthlyRevenue.map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">{m.orders}</span>
                <div
                  className="w-full bg-primary/80 rounded-t"
                  style={{ height: `${Math.max((m.revenue / maxRevenue) * 100, 2)}%` }}
                  title={`$${m.revenue}`}
                />
                <span className="text-[10px] text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Orders shown above bars</span>
            <span>Hover bars for revenue</span>
          </div>
        </div>

        <div className="bg-card border border-border p-6">
          <h2 className="font-serif text-lg mb-4">Orders by Status</h2>
          <div className="space-y-3">
            {Object.entries(data.ordersByStatus).map(([status, count]) => {
              const s = statusIcons[status] || { icon: AlertCircle, color: "text-gray-600 bg-gray-100" }
              const Icon = s.icon
              const total = Object.values(data.ordersByStatus).reduce((a, b) => a + b, 0)
              const pct = total > 0 ? (count / total) * 100 : 0
              return (
                <div key={status}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 flex items-center justify-center ${s.color}`}>
                        <Icon className="w-3 h-3" />
                      </div>
                      <span className="capitalize">{status}</span>
                    </div>
                    <span className="font-medium">{count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border p-6">
        <h2 className="font-serif text-lg mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-4 py-3 font-medium">ID</th>
                <th className="text-left px-4 py-3 font-medium">Customer</th>
                <th className="text-right px-4 py-3 font-medium">Total</th>
                <th className="text-right px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map(o => (
                <tr key={o.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{o.id.slice(0, 8)}</td>
                  <td className="px-4 py-3">{(() => { try { return JSON.parse(o.customer).name } catch { return o.customer } })()}</td>
                  <td className="px-4 py-3 text-right">${o.grandTotal}</td>
                  <td className="px-4 py-3 text-right capitalize">{o.status}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
