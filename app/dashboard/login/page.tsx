"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export default function DashboardLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useI18n()
  const d = t.dashboard.login

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push("/dashboard")
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/20">
      <div className="bg-card border border-border p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl tracking-tight">{d.heading}</h1>
          <p className="text-sm text-muted-foreground mt-1">{d.enterPassword}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false) }}
              placeholder={d.password}
              className="w-full bg-secondary/50 border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent"
              autoFocus
            />
            {error && <p className="text-xs text-destructive mt-1">{d.incorrect}</p>}
          </div>
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-primary text-primary-foreground py-3 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "..." : d.signIn}
          </button>
        </form>
      </div>
    </div>
  )
}
