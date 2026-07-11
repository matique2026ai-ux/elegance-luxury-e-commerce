"use client"

import { useEffect, useState } from "react"
import { Heart, ShoppingBag, User, LogOut, Mail, Lock, Loader2, Package, Edit2, Check } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"

interface Order {
  id: string
  items: { id: number; name: string; price: number; quantity: number; category: string }[]
  total: number
  shippingPrice: number
  grandTotal: number
  customer: { name: string; phone: string; wilaya: string; commune: string; address: string; email?: string }
  createdAt: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-rose-100 text-rose-700",
}

export default function AccountPage() {
  const { t } = useI18n()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login")
  const [form, setForm] = useState({ name: "", email: "", password: "", code: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [newName, setNewName] = useState("")

  useEffect(() => {
    fetch("/api/auth/user")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.authed) {
          setUser({ name: data.name, email: data.email || "" })
          setNewName(data.name)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!user?.email) return
    setOrdersLoading(true)
    fetch(`/api/orders?email=${encodeURIComponent(user.email)}`)
      .then(r => r.json())
      .then(setOrders)
      .finally(() => setOrdersLoading(false))
  }, [user?.email])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSuccess("")
    setSubmitting(true)
    try {
      if (mode === "forgot") {
        if (!form.code) {
          const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.email }),
          })
          const data = await res.json()
          if (res.ok) {
            setForm(prev => ({ ...prev, code: data.code || "sent" }))
          } else {
            setError(data.error || "Something went wrong")
          }
        } else {
          const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.email, code: form.code, password: form.password }),
          })
          const data = await res.json()
          if (res.ok) {
            setMode("login")
            setForm({ name: "", email: form.email, password: "", code: "" })
            setSuccess("Password updated! Sign in with your new password.")
          } else {
            setError(data.error || "Something went wrong")
          }
        }
      } else {
        const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register"
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mode === "login" ? { email: form.email, password: form.password } : form),
        })
        const data = await res.json()
        if (res.ok) {
          setUser(data.user)
          setNewName(data.user.name)
          setForm({ name: "", email: "", password: "", code: "" })
        } else {
          setError(data.error || "Something went wrong")
        }
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
    setOrders([])
  }

  async function saveName() {
    if (!newName.trim() || newName.trim().length < 2) return
    const res = await fetch("/api/auth/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    })
    if (res.ok) {
      setUser(prev => prev ? { ...prev, name: newName.trim() } : null)
      setEditingName(false)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>

  if (user) {
    return (
      <div className="min-h-screen">
        <div className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="flex items-start justify-between mb-12">
              <div>
                <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">{t.header.account}</h1>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {editingName ? (
                      <div className="flex items-center gap-2">
                        <input type="text" value={newName} onChange={e => setNewName(e.target.value)} className="bg-secondary/50 border border-border px-3 py-1 text-sm focus:outline-none focus:border-accent" autoFocus />
                        <button onClick={saveName} className="p-1 hover:text-accent"><Check className="w-4 h-4" /></button>
                        <button onClick={() => { setEditingName(false); setNewName(user.name) }} className="p-1 hover:text-muted-foreground"><LogOut className="w-4 h-4 rotate-90" /></button>
                      </div>
                    ) : (
                      <>
                        <span className="text-muted-foreground">{user.name}</span>
                        <button onClick={() => setEditingName(true)} className="p-1 hover:text-accent"><Edit2 className="w-3 h-3" /></button>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Link href="/favorites" className="bg-card border border-border p-6 text-center hover:bg-secondary/50 transition-colors group">
                <Heart className="w-8 h-8 mx-auto mb-3 group-hover:text-accent transition-colors" />
                <h3 className="font-serif text-lg mb-1">{t.accountLinks.favorites}</h3>
                <p className="text-xs text-muted-foreground">{t.accountLinks.viewFavorites}</p>
              </Link>
              <Link href="/products" className="bg-card border border-border p-6 text-center hover:bg-secondary/50 transition-colors group">
                <ShoppingBag className="w-8 h-8 mx-auto mb-3 group-hover:text-accent transition-colors" />
                <h3 className="font-serif text-lg mb-1">Continue Shopping</h3>
                <p className="text-xs text-muted-foreground">Browse our collection</p>
              </Link>
            </div>

            <div>
              <h2 className="font-serif text-2xl mb-6 flex items-center gap-3">
                <Package className="w-5 h-5" /> My Orders
              </h2>
              {ordersLoading ? (
                <p className="text-muted-foreground">Loading orders...</p>
              ) : orders.length === 0 ? (
                <div className="bg-card border border-border p-8 text-center">
                  <p className="text-muted-foreground mb-4">No orders yet</p>
                  <Link href="/products" className="text-sm tracking-wider uppercase underline">Start Shopping</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((o) => (
                    <div key={o.id} className="bg-card border border-border p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                        <div>
                          <span className="text-xs text-muted-foreground">Order #{o.id.slice(0, 8)}</span>
                          <span className={`ml-3 inline-block px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase ${statusColors[o.status] || "bg-secondary text-muted-foreground"}`}>{o.status}</span>
                        </div>
                        <span className="font-serif text-lg">{o.grandTotal.toLocaleString()} DZD</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {o.items.map((item, i) => (
                          <span key={i}>{item.name} x{item.quantity}{i < o.items.length - 1 ? ", " : ""}</span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Deliver to: {o.customer.wilaya}, {o.customer.commune}</p>
                    </div>
                  ))}
                </div>
              )}
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
            {mode === "forgot" ? (
              <button onClick={() => setMode("login")} className="px-6 py-2 text-sm tracking-wider uppercase border border-border hover:bg-secondary transition-colors">← Back to Sign In</button>
            ) : (
              <>
                <button onClick={() => setMode("login")} className={`px-6 py-2 text-sm tracking-wider uppercase transition-colors ${mode === "login" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"}`}>Sign In</button>
                <button onClick={() => setMode("register")} className={`px-6 py-2 text-sm tracking-wider uppercase transition-colors ${mode === "register" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"}`}>Register</button>
              </>
            )}
          </div>
          <form onSubmit={handleSubmit} className="bg-card border border-border p-8 space-y-4">
            {success && <p className="text-sm text-emerald-600 bg-emerald-50 p-3">{success}</p>}
            {error && <p className="text-sm text-destructive bg-destructive/10 p-3">{error}</p>}
            {mode === "forgot" ? (
              <>
                <p className="text-sm text-muted-foreground">Enter your email and a reset code will be sent.</p>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">Email</label>
                  <div className="flex border border-border">
                    <span className="flex items-center px-4 bg-secondary/50 border-r border-border"><Mail className="w-4 h-4 text-muted-foreground" /></span>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm" placeholder="email@example.com" />
                  </div>
                </div>
                {form.code !== "" && (
                  <>
                    <div>
                      <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">Reset Code</label>
                      <input type="text" required value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} className="w-full bg-secondary/50 border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent" placeholder="000000" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">New Password</label>
                      <div className="flex border border-border">
                        <span className="flex items-center px-4 bg-secondary/50 border-r border-border"><Lock className="w-4 h-4 text-muted-foreground" /></span>
                        <input type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm" placeholder="Min 6 characters" minLength={6} />
                      </div>
                    </div>
                  </>
                )}
                <button type="submit" disabled={submitting} className="w-full bg-primary text-primary-foreground py-3 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {form.code ? "Reset Password" : "Send Reset Code"}
                </button>
              </>
            ) : (
              <>
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
                {mode === "login" && (
                  <button type="button" onClick={() => setMode("forgot")} className="text-xs text-muted-foreground hover:text-accent transition-colors underline">Forgot password?</button>
                )}
                <button type="submit" disabled={submitting} className="w-full bg-primary text-primary-foreground py-3 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {mode === "login" ? "Sign In" : "Create Account"}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
