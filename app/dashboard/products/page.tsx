"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, X } from "lucide-react"

interface Product {
  id: number; name: string; category: string; sub: string; price: number; image: string; isNew: boolean
}

const categoryLabels: Record<string, string> = { men: "Men", women: "Women", children: "Children" }
const emptyForm = { name: "", category: "men" as const, sub: "Clothing", price: 0, image: "", isNew: false }

export default function DashboardProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => { fetch("/api/products").then(r => r.json()).then(setProducts) }, [])

  function openAdd() { setForm(emptyForm); setEditingId(null); setShowForm(true) }
  function openEdit(p: Product) { setForm({ name: p.name, category: p.category as typeof form.category, sub: p.sub, price: p.price, image: p.image, isNew: p.isNew }); setEditingId(p.id); setShowForm(true) }

  async function save() {
    if (editingId) {
      await fetch(`/api/products/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    } else {
      await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    }
    setShowForm(false)
    fetch("/api/products").then(r => r.json()).then(setProducts)
  }

  async function remove(id: number) {
    await fetch(`/api/products/${id}`, { method: "DELETE" })
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">Products</h1>
        <button type="button" onClick={openAdd} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl">{editingId ? "Edit Product" : "Add Product"}</h2>
              <button type="button" onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">Name</label>
                <input type="text" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">Category</label>
                <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value as any }))} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent">
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="children">Children</option>
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">Subcategory</label>
                <select value={form.sub} onChange={e => setForm(prev => ({ ...prev, sub: e.target.value }))} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent">
                  <option value="Clothing">Clothing</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Fragrances">Fragrances</option>
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">Price (DZD)</label>
                <input type="number" value={form.price} onChange={e => setForm(prev => ({ ...prev, price: Number(e.target.value) }))} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">Image URL</label>
                <input type="text" value={form.image} onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="isNew" checked={form.isNew} onChange={e => setForm(prev => ({ ...prev, isNew: e.target.checked }))} className="w-4 h-4 accent-accent" />
                <label htmlFor="isNew" className="text-sm">Mark as New</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={save} className="bg-primary text-primary-foreground px-6 py-2 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors">Save</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 text-sm tracking-wider uppercase hover:bg-secondary transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">Name</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">Category</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">Subcategory</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">Price</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">Status</th>
              <th className="text-right px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-6 py-4 font-medium">{p.name}</td>
                <td className="px-6 py-4">
                  <span className="bg-secondary px-3 py-1 text-[10px] tracking-[0.1em] uppercase">{categoryLabels[p.category] || p.category}</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{p.sub}</td>
                <td className="px-6 py-4">{p.price.toLocaleString()} DZD</td>
                <td className="px-6 py-4">
                  {p.isNew ? (
                    <span className="bg-accent/20 text-accent-foreground px-3 py-1 text-[10px] tracking-[0.1em] uppercase">New</span>
                  ) : (
                    <span className="bg-secondary text-muted-foreground px-3 py-1 text-[10px] tracking-[0.1em] uppercase">Active</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button type="button" onClick={() => openEdit(p)} className="p-2 hover:bg-secondary transition-colors" aria-label="Edit"><Pencil className="w-4 h-4" /></button>
                    <button type="button" onClick={() => remove(p.id)} className="p-2 hover:bg-destructive/10 hover:text-destructive transition-colors" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
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
