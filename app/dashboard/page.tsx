"use client"

import { useEffect, useState } from "react"
import { Users, Calendar, Mail, ShoppingBag } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

interface Stats {
  totalSubscribers: number
  pendingAppointments: number
  unreadMessages: number
  totalAppointments: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const { t } = useI18n()
  const d = t.dashboard.overview

  const statCards = [
    { key: "totalAppointments" as const, label: d.appointments, icon: Calendar, color: "text-blue-600 bg-blue-100" },
    { key: "pendingAppointments" as const, label: d.pending, icon: ShoppingBag, color: "text-amber-600 bg-amber-100" },
    { key: "unreadMessages" as const, label: d.unreadMessages, icon: Mail, color: "text-rose-600 bg-rose-100" },
    { key: "totalSubscribers" as const, label: d.subscribers, icon: Users, color: "text-emerald-600 bg-emerald-100" },
  ]

  useEffect(() => {
    fetch("/api/newsletter")
      .then(r => r.json())
      .then((subs) => {
        setStats({
          totalSubscribers: subs.length,
          pendingAppointments: 0,
          unreadMessages: 0,
          totalAppointments: 0,
        })
      })
    fetch("/api/appointment").then(r => r.json()).then((apps) => {
      setStats(prev => prev ? { ...prev, pendingAppointments: apps.filter((a: any) => a.status === "pending").length, totalAppointments: apps.length } : prev)
    })
    fetch("/api/contact").then(r => r.json()).then((msgs) => {
      setStats(prev => prev ? { ...prev, unreadMessages: msgs.filter((m: any) => !m.read).length } : prev)
    })
  }, [])

  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-8">{d.heading}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className="bg-card p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 flex items-center justify-center ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl font-serif">{stats?.[key] ?? "—"}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border p-6">
          <h2 className="font-serif text-xl mb-4">{d.quickActions}</h2>
          <div className="space-y-3">
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
              <span className="font-medium">v1.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
