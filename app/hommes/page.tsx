"use client"

import { useState, useEffect } from "react"
import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { useCart } from "@/context/cart-context"

interface Product {
  id: number; name: string; category: string; sub: string; price: number; image: string; isNew: boolean
}

export default function HommesPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { t } = useI18n()
  const { addItem } = useCart()

  useEffect(() => {
    fetch("/api/products?category=men").then(r => r.json()).then(setProducts)
  }, [])

  const subs = [...new Set(products.map(p => p.sub))]
  const [activeSub, setActiveSub] = useState<string>("all")

  const filtered = activeSub === "all" ? products : products.filter(p => p.sub === activeSub)

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.featured.shopMen}</p>
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{t.header.men}</h1>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => setActiveSub("all")} className={`px-6 py-2 text-sm tracking-wider uppercase transition-colors ${activeSub === "all" ? "bg-primary text-primary-foreground" : "bg-secondary/50 hover:bg-secondary"}`}>{t.products.categories.all}</button>
            {subs.map(s => (
              <button key={s} onClick={() => setActiveSub(s)} className={`px-6 py-2 text-sm tracking-wider uppercase transition-colors ${activeSub === s ? "bg-primary text-primary-foreground" : "bg-secondary/50 hover:bg-secondary"}`}>{s}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map(p => (
            <div key={p.id} className="group" onMouseEnter={() => setHoveredId(p.id)} onMouseLeave={() => setHoveredId(null)}>
              <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-secondary/20">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-4 transition-opacity duration-300 ${hoveredId === p.id ? "opacity-100" : "opacity-0"}`}>
                  <button onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1, category: p.category })} className="bg-white text-black p-3 hover:bg-accent transition-colors"><ShoppingBag className="w-5 h-5" /></button>
                  <button className="bg-white text-black p-3 hover:bg-accent transition-colors"><Heart className="w-5 h-5" /></button>
                </div>
                {p.isNew && <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs px-3 py-1 tracking-wider uppercase">{t.featured.new}</span>}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground tracking-wider uppercase">{p.sub}</p>
                <h3 className="font-serif text-lg">{p.name}</h3>
                <p className="font-medium">{p.price.toLocaleString()} {t.products.currency}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
