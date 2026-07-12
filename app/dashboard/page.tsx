"use client"

import { useEffect, useState } from "react"
import { Users, Calendar, Mail, ShoppingBag, Package, AlertCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

interface Stats {
  totalSubscribers: number
  pendingAppointments: number
  unreadMessages: number
  totalAppointments: number
  totalOrders: number
  pendingOrders: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const { t } = useI18n()
  const d = t.dashboard.overview

  useEffect(() => {
    fetch("/api/stats").then(r => r.json()).then(setStats).catch(() => {})
  }, [])

  const statCards = [
    { key: "totalOrders" as const, label: d.totalOrders || "Total Orders", icon: ShoppingBag, color: "text-indigo-600 bg-indigo-100" },
    { key: "pendingOrders" as const, label: d.pendingOrders || "Pending Orders", icon: AlertCircle, color: "text-amber-600 bg-amber-100" },
    { key: "totalAppointments" as const, label: d.appointments, icon: Calendar, color: "text-blue-600 bg-blue-100" },
    { key: "unreadMessages" as const, label: d.unreadMessages || "Unread Messages", icon: Mail, color: "text-rose-600 bg-rose-100" },
    { key: "totalSubscribers" as const, label: d.subscribers, icon: Users, color: "text-emerald-600 bg-emerald-100" },
  ]

  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-8">{d.heading}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
        {statCards.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className="bg-card p-5 border border-border">
            <div className={`w-10 h-10 flex items-center justify-center ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-serif mt-3">{stats?.[key] ?? "—"}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border p-6">
          <h2 className="font-serif text-xl mb-4">{d.quickActions}</h2>
          <div className="space-y-3">
            <a href="/dashboard/orders" className="block px-4 py-3 bg-secondary/50 hover:bg-secondary transition-colors text-sm">
              {d.viewOrders || "→ View Orders"}
            </a>
            <a href="/dashboard/products" className="block px-4 py-3 bg-secondary/50 hover:bg-secondary transition-colors text-sm">
              {d.manageProducts}
            </a>
            <a href="/dashboard/appointments" className="block px-4 py-3 bg-secondary/50 hover:bg-secondary transition-colors text-sm">
              {d.viewAppointments}
            </a>
            <a href="/dashboard/messages" className="block px-4 py-3 bg-secondary/50 hover:bg-secondary transition-colors text-sm">
              {d.checkMessages}
            </a>
            <a href="/dashboard/subscribers" className="block px-4 py-3 bg-secondary/50 hover:bg-secondary transition-colors text-sm">
              {d.viewSubscribers}
            </a>
          </div>
        </div>

        <div className="bg-card border border-border p-6">
          <h2 className="font-serif text-xl mb-4">{d.storeInfo}</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">{d.storeName}</span>
              <span className="font-medium">MAISON HERAHIMA</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">{d.status}</span>
              <span className="text-emerald-600 font-medium">{d.live}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">{d.languages}</span>
              <span className="font-medium">EN / FR / AR</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">{d.version}</span>
              <span className="font-medium">v2.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
