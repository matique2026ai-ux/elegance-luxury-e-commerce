"use client"

import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"

interface Subscriber {
  id: string
  email: string
  date: string
}

export default function DashboardSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])

  useEffect(() => {
    fetch("/api/newsletter").then(r => r.json()).then(setSubscribers)
  }, [])

  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-8">Newsletter Subscribers</h1>

      <div className="bg-card border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">Email</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">Subscribed Date</th>
              <th className="text-right px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length === 0 && (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-muted-foreground">No subscribers yet.</td></tr>
            )}
            {subscribers.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-6 py-4 font-medium">{s.email}</td>
                <td className="px-6 py-4 text-muted-foreground">{new Date(s.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button type="button" className="p-2 hover:bg-destructive/10 hover:text-destructive transition-colors" aria-label="Delete">
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
