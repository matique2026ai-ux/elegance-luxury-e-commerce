"use client"

import { useEffect, useState } from "react"
import { Trash2, Download } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

export default function DashboardUsers() {
  const [users, setUsers] = useState<User[]>([])
  const { t } = useI18n()
  const d = t.dashboard

  useEffect(() => {
    fetch("/api/users").then(r => r.json()).then(setUsers)
  }, [])

  async function remove(id: number) {
    await fetch(`/api/users?id=${id}`, { method: "DELETE" })
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">Users</h1>
        <a href="/api/export?type=users" className="p-2 hover:bg-secondary/50 transition-colors border border-border flex items-center gap-2 text-sm" download><Download className="w-4 h-4" /> CSV</a>
      </div>

      <div className="bg-card border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">Name</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">Email</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">Registered</th>
              <th className="text-right px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">No users yet</td></tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-6 py-4 font-medium">{u.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{u.email}</td>
                <td className="px-6 py-4 text-muted-foreground">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button type="button" onClick={() => remove(u.id)} className="p-2 hover:bg-destructive/10 hover:text-destructive transition-colors">
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
