"use client"

import { useEffect, useState } from "react"
import { Check, X, Trash2 } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

interface Appointment {
  id: string
  name: string
  email: string
  phone?: string
  date?: string
  message?: string
  createdAt: string
  status: "pending" | "confirmed" | "cancelled"
}

export default function DashboardAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const { t } = useI18n()
  const d = t.dashboard.appointments

  useEffect(() => {
    fetch("/api/appointment").then(r => r.json()).then(setAppointments)
  }, [])

  const updateStatus = async (id: string, status: "confirmed" | "cancelled") => {
    await fetch("/api/appointment", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) })
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-8">{d.heading}</h1>

      <div className="bg-card border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.client}</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.contact}</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.date}</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.status}</th>
              <th className="text-right px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.actions}</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">{d.noAppointments}</td></tr>
            )}
            {appointments.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium">{a.name}</p>
                  {a.message && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{a.message}</p>}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm">{a.email}</p>
                  {a.phone && <p className="text-xs text-muted-foreground">{a.phone}</p>}
                </td>
                <td className="px-6 py-4 text-muted-foreground">{a.date || "—"}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 text-[10px] tracking-[0.1em] uppercase ${
                    a.status === "confirmed" ? "bg-emerald-100 text-emerald-700" :
                    a.status === "cancelled" ? "bg-rose-100 text-rose-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {a.status === "pending" && (
                      <>
                        <button type="button" onClick={() => updateStatus(a.id, "confirmed")} className="p-2 hover:bg-emerald-100 hover:text-emerald-700 transition-colors" aria-label={d.confirmAria}><Check className="w-4 h-4" /></button>
                        <button type="button" onClick={() => updateStatus(a.id, "cancelled")} className="p-2 hover:bg-rose-100 hover:text-rose-700 transition-colors" aria-label={d.cancelAria}><X className="w-4 h-4" /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
