"use client"

import { useEffect, useState } from "react"
import { Trash2, Download } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

interface Subscriber {
  id: string
  email: string
  date: string
}

export default function DashboardSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const { t } = useI18n()
  const d = t.dashboard.subscribers

  useEffect(() => {
    fetch("/api/newsletter").then(r => r.json()).then(setSubscribers)
  }, [])

  async function remove(id: string) {
    await fetch(`/api/newsletter?id=${id}`, { method: "DELETE" })
    setSubscribers(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">{d.heading}</h1>
        <a href="/api/export?type=subscribers" className="p-2 hover:bg-secondary/50 transition-colors border border-border flex items-center gap-2 text-sm" download><Download className="w-4 h-4" /> CSV</a>
      </div>

      <div className="bg-card border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.email}</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.date}</th>
              <th className="text-right px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.actions}</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length === 0 && (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-muted-foreground">{d.noSubscribers}</td></tr>
            )}
            {subscribers.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-6 py-4 font-medium">{s.email}</td>
                <td className="px-6 py-4 text-muted-foreground">{new Date(s.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button type="button" onClick={() => remove(s.id)} className="p-2 hover:bg-destructive/10 hover:text-destructive transition-colors" aria-label={d.deleteAria}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
