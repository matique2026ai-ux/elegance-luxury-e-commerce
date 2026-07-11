"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

interface Product {
  id: number; name: string; category: string; sub: string; price: number; stock: number; image: string; isNew: boolean
}

const emptyForm = { name: "", category: "men" as const, sub: "Clothing", price: 0, stock: 0, image: "", isNew: false }

export default function DashboardProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const { t } = useI18n()
  const d = t.dashboard.products

  useEffect(() => { fetch("/api/products").then(r => r.json()).then(setProducts) }, [])

  function openAdd() { setForm(emptyForm); setEditingId(null); setShowForm(true) }
  function openEdit(p: Product) { setForm({ name: p.name, category: p.category as typeof form.category, sub: p.sub, price: p.price, stock: p.stock, image: p.image, isNew: p.isNew }); setEditingId(p.id); setShowForm(true) }

  async function save() {
    const body = {
      name_en: form.name,
      name_fr: form.name,
      name_ar: form.name,
      category: form.category,
      sub_en: form.sub,
      sub_fr: form.sub,
      sub_ar: form.sub,
      price: form.price,
      stock: form.stock,
      image: form.image,
      isNew: form.isNew ? 1 : 0,
    }
    if (editingId) {
      const res = await fetch(`/api/products/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (!res.ok) return alert((await res.json()).error || "Failed to update")
      setProducts(prev => prev.map(p => p.id === editingId ? { ...p, name: form.name, category: form.category, sub: form.sub, price: form.price, stock: form.stock, image: form.image, isNew: form.isNew } : p))
    } else {
      const res = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (!res.ok) return alert((await res.json()).error || "Failed to add")
      const created = await res.json()
      setProducts(prev => [...prev, created])
    }
    setShowForm(false)
  }

  async function remove(id: number) {
    await fetch(`/api/products/${id}`, { method: "DELETE" })
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">{d.heading}</h1>
        <button type="button" onClick={openAdd} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> {d.addProduct}
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl">{editingId ? d.editProduct : d.addProduct}</h2>
              <button type="button" onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">{d.form.name}</label>
                <input type="text" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">{d.form.category}</label>
                <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value as any }))} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent">
                  <option value="men">{d.categoryOptions.men}</option>
                  <option value="women">{d.categoryOptions.women}</option>
                  <option value="children">{d.categoryOptions.children}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">{d.form.subcategory}</label>
                <select value={form.sub} onChange={e => setForm(prev => ({ ...prev, sub: e.target.value }))} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent">
                  <option value="Clothing">{d.subOptions.clothing}</option>
                  <option value="Shoes">{d.subOptions.shoes}</option>
                  <option value="Accessories">{d.subOptions.accessories}</option>
                  <option value="Fragrances">{d.subOptions.fragrances}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">{d.form.price}</label>
                <input type="number" value={form.price} onChange={e => setForm(prev => ({ ...prev, price: Number(e.target.value) }))} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">{d.form.stock}</label>
                <input type="number" value={form.stock} onChange={e => setForm(prev => ({ ...prev, stock: Number(e.target.value) }))} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">{d.form.imageUrl}</label>
                <div className="flex gap-3 items-start">
                  <div className="flex-1">
                    <input type="text" value={form.image} onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))} placeholder="https://..." className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent mb-2" />
                    <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-accent transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload from computer</span>
                      <input type="file" accept="image/*" className="hidden" onChange={async e => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onload = () => setForm(prev => ({ ...prev, image: reader.result as string }))
                        reader.readAsDataURL(file)
                      }} />
                    </label>
                  </div>
                  {form.image && (
                    <div className="w-16 h-16 border border-border overflow-hidden shrink-0 bg-secondary/30">
                      <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="isNew" checked={form.isNew} onChange={e => setForm(prev => ({ ...prev, isNew: e.target.checked }))} className="w-4 h-4 accent-accent" />
                <label htmlFor="isNew" className="text-sm">{d.form.markAsNew}</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={save} className="bg-primary text-primary-foreground px-6 py-2 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors">{d.form.save}</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 text-sm tracking-wider uppercase hover:bg-secondary transition-colors">{d.form.cancel}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.name}</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.category}</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.subcategory}</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.price}</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.stock}</th>
              <th className="text-left px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.status}</th>
              <th className="text-right px-6 py-4 tracking-[0.1em] uppercase text-muted-foreground font-medium">{d.table.actions}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-6 py-4 font-medium">{p.name}</td>
                <td className="px-6 py-4">
                  <span className="bg-secondary px-3 py-1 text-[10px] tracking-[0.1em] uppercase">{d.categoryOptions[p.category as keyof typeof d.categoryOptions] || p.category}</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{p.sub}</td>
                <td className="px-6 py-4">{p.price.toLocaleString()} DZD</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-[10px] tracking-[0.1em] uppercase ${p.stock > 0 ? "bg-secondary text-muted-foreground" : "bg-destructive/10 text-destructive"}`}>{p.stock}</span>
                </td>
                <td className="px-6 py-4">
                  {p.isNew ? (
                    <span className="bg-accent/20 text-accent-foreground px-3 py-1 text-[10px] tracking-[0.1em] uppercase">{d.status.new}</span>
                  ) : (
                    <span className="bg-secondary text-muted-foreground px-3 py-1 text-[10px] tracking-[0.1em] uppercase">{d.status.active}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button type="button" onClick={() => openEdit(p)} className="p-2 hover:bg-secondary transition-colors" aria-label={d.editAria}><Pencil className="w-4 h-4" /></button>
                    <button type="button" onClick={() => remove(p.id)} className="p-2 hover:bg-destructive/10 hover:text-destructive transition-colors" aria-label={d.deleteAria}><Trash2 className="w-4 h-4" /></button>
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
