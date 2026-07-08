"use client"

import { useEffect, useState } from "react"
import { MailOpen, Trash2 } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

interface Message {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  createdAt: string
  read: boolean
}

export default function DashboardMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const { t } = useI18n()
  const d = t.dashboard.messages

  useEffect(() => {
    fetch("/api/contact").then(r => r.json()).then(setMessages)
  }, [])

  const markRead = async (id: string) => {
    await fetch("/api/contact", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
  }

  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-8">{d.heading}</h1>

      <div className="space-y-4">
        {messages.length === 0 && (
          <p className="text-center text-muted-foreground py-12">{d.noMessages}</p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`bg-card border border-border p-6 ${!msg.read ? "border-l-4 border-l-accent" : ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`font-medium ${!msg.read ? "text-accent" : ""}`}>{msg.name}</h3>
                  {!msg.read && <span className="w-2 h-2 bg-accent" />}
                  {msg.subject && <span className="text-xs text-muted-foreground">— {msg.subject}</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{msg.email}</p>
                <p className="text-sm mt-3">{msg.message}</p>
                <p className="text-xs text-muted-foreground mt-3">{new Date(msg.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!msg.read && (
                  <button type="button" onClick={() => markRead(msg.id)} className="p-2 hover:bg-secondary transition-colors" aria-label={d.markAsReadAria}>
                    <MailOpen className="w-4 h-4" />
                  </button>
                )}
                <button type="button" className="p-2 hover:bg-destructive/10 hover:text-destructive transition-colors" aria-label={d.deleteAria}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
