"use client"

import { useEffect, useState } from "react"
import { Heart, ShoppingBag, User, MapPin, LogOut, Mail, Lock, Loader2 } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"

export default function AccountPage() {
  const { t } = useI18n()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<"login" | "register">("login")
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch("/api/auth/user")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.authed) setUser({ name: data.name, email: "" }) })
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register"
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mode === "login" ? { email: form.email, password: form.password } : form),
      })
      const data = await res.json()
      if (res.ok) {
        setUser(data.user)
        setForm({ name: "", email: "", password: "" })
      } else {
        setError(data.error || "Something went wrong")
      }
    } catch {
      setError("Network error")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout/user", { method: "POST" })
    setUser(null)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>

  if (user) {
    return (
      <div className="min-h-screen">
        <div className="pt-28 pb-24">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-2">{t.header.account}</h1>
                <p className="text-muted-foreground">Welcome, {user.name}</p>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/favorites" className="bg-card border border-border p-8 text-center hover:bg-secondary/50 transition-colors group">
                <Heart className="w-8 h-8 mx-auto mb-4 group-hover:text-accent transition-colors" />
                <h3 className="font-serif text-xl mb-1">{t.accountLinks.favorites}</h3>
                <p className="text-sm text-muted-foreground">{t.accountLinks.viewFavorites}</p>
              </Link>
              <Link href="/checkout" className="bg-card border border-border p-8 text-center hover:bg-secondary/50 transition-colors group">
                <ShoppingBag className="w-8 h-8 mx-auto mb-4 group-hover:text-accent transition-colors" />
                <h3 className="font-serif text-xl mb-1">{t.accountLinks.orders}</h3>
                <p className="text-sm text-muted-foreground">{t.accountLinks.viewOrders}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-24">
        <div className="max-w-md mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-2 text-center">{t.header.account}</h1>
          <div className="flex justify-center gap-4 mb-8">
            <button onClick={() => setMode("login")} className={`px-6 py-2 text-sm tracking-wider uppercase transition-colors ${mode === "login" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"}`}>Sign In</button>
            <button onClick={() => setMode("register")} className={`px-6 py-2 text-sm tracking-wider uppercase transition-colors ${mode === "register" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"}`}>Register</button>
          </div>
          <form onSubmit={handleSubmit} className="bg-card border border-border p-8 space-y-4">
            {error && <p className="text-sm text-destructive bg-destructive/10 p-3">{error}</p>}
            {mode === "register" && (
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">Name</label>
                <div className="flex border border-border">
                  <span className="flex items-center px-4 bg-secondary/50 border-r border-border"><User className="w-4 h-4 text-muted-foreground" /></span>
                  <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm" placeholder="Your name" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">Email</label>
              <div className="flex border border-border">
                <span className="flex items-center px-4 bg-secondary/50 border-r border-border"><Mail className="w-4 h-4 text-muted-foreground" /></span>
                <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm" placeholder="email@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">Password</label>
              <div className="flex border border-border">
                <span className="flex items-center px-4 bg-secondary/50 border-r border-border"><Lock className="w-4 h-4 text-muted-foreground" /></span>
                <input type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm" placeholder="Min 6 characters" minLength={6} />
              </div>
            </div>
            <button type="submit" disabled={submitting} className="w-full bg-primary text-primary-foreground py-3 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
