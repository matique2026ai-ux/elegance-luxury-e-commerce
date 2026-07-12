"use client"

import { useEffect, useState } from "react"
import { Trash2, RefreshCw } from "lucide-react"

interface Activity {
  id: number
  action: string
  entityType: string
  entityId: string
  description: string
  adminName: string
  createdAt: string
}

export default function ActivityPage() {
  const [logs, setLogs] = useState<Activity[]>([])

  function load() {
    fetch("/api/activity-log").then(r => r.json()).then(setLogs)
  }

  useEffect(load, [])

  async function clear() {
    if (!confirm("Clear all activity logs?")) return
    await fetch("/api/activity-log", { method: "DELETE" })
    setLogs([])
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">Activity Log</h1>
        <div className="flex gap-2">
          <button type="button" onClick={load} className="p-2 hover:bg-secondary/50 transition-colors border border-border">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button type="button" onClick={clear} className="p-2 hover:bg-destructive/10 hover:text-destructive transition-colors border border-border">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-card border border-border">
        {logs.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No activity recorded yet</p>
        ) : (
          <div className="divide-y divide-border">
            {logs.map(log => (
              <div key={log.id} className="px-6 py-4 flex items-start gap-4">
                <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${
                  log.action === "create" ? "bg-emerald-500" :
                  log.action === "update" ? "bg-blue-500" :
                  log.action === "delete" ? "bg-red-500" : "bg-amber-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{log.adminName}</span>
                    <span className="text-muted-foreground"> {log.description}</span>
                  </p>
                  <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                    <span className="capitalize bg-secondary/50 px-1.5 py-0.5">{log.entityType}</span>
                    <span>#{log.entityId}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{new Date(log.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
