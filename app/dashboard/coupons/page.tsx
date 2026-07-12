"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2, RefreshCw, Check, X, Percent, DollarSign } from "lucide-react"

interface Coupon {
  id: number
  code: string
  discountType: "percentage" | "fixed"
  discountValue: number
  minOrder: number
  maxUses: number
  usedCount: number
  expiresAt: string
  active: number
  createdAt: string
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ code: "", discountType: "percentage" as const, discountValue: "", minOrder: "0", maxUses: "0", expiresAt: "", active: true })

  function load() { fetch("/api/coupons").then(r => r.json()).then(setCoupons) }
  useEffect(load, [])

  async function add() {
    const res = await fetch("/api/coupons", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      code: form.code, discountType: form.discountType, discountValue: Number(form.discountValue),
      minOrder: Number(form.minOrder), maxUses: Number(form.maxUses), expiresAt: form.expiresAt, active: form.active ? 1 : 0,
    })})
    if (!res.ok) { const err = await res.json(); alert(err.error || "Failed to add coupon"); return }
    setShowForm(false)
    setForm({ code: "", discountType: "percentage", discountValue: "", minOrder: "0", maxUses: "0", expiresAt: "", active: true })
    load()
  }

  async function remove(id: number) {
    await fetch(`/api/coupons?id=${id}`, { method: "DELETE" })
    load()
  }

  async function toggle(c: Coupon) {
    await fetch(`/api/coupons/${c.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active: c.active ? 0 : 1 }) })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">Coupons</h1>
        <div className="flex gap-2">
          <button type="button" onClick={load} className="p-2 hover:bg-secondary/50 transition-colors border border-border"><RefreshCw className="w-4 h-4" /></button>
          <button type="button" onClick={() => setShowForm(true)} className="px-4 py-2 bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity flex items-center gap-2"><Plus className="w-4 h-4" /> Add Coupon</button>
        </div>
      </div>

      {showForm && (
        <div className="bg-card border border-border p-6 mb-6">
          <h2 className="font-serif text-lg mb-4">New Coupon</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Code</label>
              <input value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} className="w-full px-3 py-2 bg-background border border-border text-sm" placeholder="SUMMER20" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Type</label>
              <select value={form.discountType} onChange={e => setForm({ ...form, discountType: e.target.value as any })} className="w-full px-3 py-2 bg-background border border-border text-sm">
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Value</label>
              <input type="number" value={form.discountValue} onChange={e => setForm({ ...form, discountValue: e.target.value })} className="w-full px-3 py-2 bg-background border border-border text-sm" placeholder="20" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Min Order</label>
              <input type="number" value={form.minOrder} onChange={e => setForm({ ...form, minOrder: e.target.value })} className="w-full px-3 py-2 bg-background border border-border text-sm" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Max Uses (0 = unlimited)</label>
              <input type="number" value={form.maxUses} onChange={e => setForm({ ...form, maxUses: e.target.value })} className="w-full px-3 py-2 bg-background border border-border text-sm" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Expires At</label>
              <input type="date" value={form.expiresAt} onChange={e => setForm({ ...form, expiresAt: e.target.value })} className="w-full px-3 py-2 bg-background border border-border text-sm" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} className="accent-primary" />
                <span className="text-sm">Active</span>
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={add} className="px-4 py-2 bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity">Create</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-border text-sm hover:bg-secondary/50 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-card border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left px-6 py-4 text-muted-foreground font-medium">Code</th>
              <th className="text-left px-6 py-4 text-muted-foreground font-medium">Discount</th>
              <th className="text-left px-6 py-4 text-muted-foreground font-medium">Min Order</th>
              <th className="text-left px-6 py-4 text-muted-foreground font-medium">Uses</th>
              <th className="text-left px-6 py-4 text-muted-foreground font-medium">Expires</th>
              <th className="text-left px-6 py-4 text-muted-foreground font-medium">Status</th>
              <th className="text-right px-6 py-4 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 && <tr><td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">No coupons yet</td></tr>}
            {coupons.map(c => {
              const expired = c.expiresAt && new Date(c.expiresAt) < new Date()
              return (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold tracking-wider">{c.code}</td>
                  <td className="px-6 py-4">
                    {c.discountType === "percentage" ? `${c.discountValue}%` : `$${c.discountValue}`}
                  </td>
                  <td className="px-6 py-4">${c.minOrder}</td>
                  <td className="px-6 py-4">{c.usedCount}/{c.maxUses || "∞"}</td>
                  <td className="px-6 py-4">{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : "—"}</td>
                  <td className="px-6 py-4">
                    {expired ? <span className="text-red-500 text-xs">Expired</span> :
                      c.active ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-muted-foreground" />}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button type="button" onClick={() => toggle(c)} className="p-2 hover:bg-secondary/50 transition-colors" title="Toggle active">
                        {c.active ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                      <button type="button" onClick={() => remove(c.id)} className="p-2 hover:bg-destructive/10 hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
