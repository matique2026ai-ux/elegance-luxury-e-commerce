"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"

const defaultProducts = [
  { id: 1, name: "Wool Tailored Suit", category: "men", sub: "Clothing", price: 3200, isNew: true },
  { id: 2, name: "Linen Blazer", category: "men", sub: "Clothing", price: 1800, isNew: false },
  { id: 3, name: "Leather Oxford Shoes", category: "men", sub: "Shoes", price: 1450, isNew: false },
  { id: 4, name: "Cashmere Scarf", category: "men", sub: "Accessories", price: 680, isNew: true },
  { id: 5, name: "Eau de Parfum", category: "men", sub: "Fragrances", price: 320, isNew: true },
  { id: 6, name: "Silk Evening Gown", category: "women", sub: "Clothing", price: 8750, isNew: true },
  { id: 7, name: "Pearl Necklace", category: "women", sub: "Accessories", price: 4890, isNew: true },
  { id: 8, name: "Leather Duchess Bag", category: "women", sub: "Accessories", price: 2450, isNew: false },
  { id: 9, name: "Floral Summer Dress", category: "women", sub: "Clothing", price: 1200, isNew: false },
  { id: 10, name: "Sapphire Ring", category: "women", sub: "Accessories", price: 12500, isNew: false },
  { id: 11, name: "Stiletto Heels", category: "women", sub: "Shoes", price: 980, isNew: true },
  { id: 12, name: "Eau de Parfum Rose", category: "women", sub: "Fragrances", price: 380, isNew: false },
  { id: 13, name: "Cashmere Cardigan", category: "children", sub: "Clothing", price: 480, isNew: false },
  { id: 14, name: "Mini Leather Sneakers", category: "children", sub: "Shoes", price: 280, isNew: true },
  { id: 15, name: "Kids Silk Bow Tie", category: "children", sub: "Accessories", price: 150, isNew: true },
  { id: 16, name: "Velvet Party Dress", category: "children", sub: "Clothing", price: 650, isNew: true },
]

const categoryLabels: Record<string, string> = {
  men: "Men",
  women: "Women",
  children: "Children",
}

export default function DashboardProducts() {
  const [products, setProducts] = useState(defaultProducts)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">Products</h1>
        <button type="button" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

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
                <td className="px-6 py-4">${p.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  {p.isNew ? (
                    <span className="bg-accent/20 text-accent-foreground px-3 py-1 text-[10px] tracking-[0.1em] uppercase">New</span>
                  ) : (
                    <span className="bg-secondary text-muted-foreground px-3 py-1 text-[10px] tracking-[0.1em] uppercase">Active</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button type="button" className="p-2 hover:bg-secondary transition-colors" aria-label="Edit"><Pencil className="w-4 h-4" /></button>
                    <button type="button" className="p-2 hover:bg-destructive/10 hover:text-destructive transition-colors" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
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
