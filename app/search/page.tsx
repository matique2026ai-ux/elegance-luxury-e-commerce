"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"
import { Heart, ShoppingBag } from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  sub: string
  price: number
  stock: number
  image: string
  isNew: boolean
}

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t, lang } = useI18n()
  const { addItem, openCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setSearched(false); return }
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(`/api/products?q=${encodeURIComponent(q)}&lang=${lang}`)
      if (res.ok) setResults(await res.json())
    } catch {} finally {
      setLoading(false)
    }
  }, [lang])

  useEffect(() => {
    const q = searchParams.get("q")
    if (q) { setQuery(q); doSearch(q) }
  }, [searchParams, doSearch])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        router.replace(`/search?q=${encodeURIComponent(query)}`, { scroll: false })
        doSearch(query)
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [query, router, doSearch])

  const handleAdd = (product: Product) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1, category: product.category })
    openCart()
  }

  const catKey = (cat: string) => {
    const map: Record<string, string> = { men: t.products.categories.men, women: t.products.categories.women, children: t.products.categories.children }
    return map[cat] || cat
  }

  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="max-w-xl mx-auto mb-12">
          <div className="flex items-center border border-border bg-background">
            <span className="flex items-center px-4"><Search className="w-4 h-4 text-muted-foreground" /></span>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t.header.search + "..."}
              autoFocus
              className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm"
            />
            {query && (
              <button onClick={() => { setQuery(""); setResults([]); setSearched(false); router.replace("/search") }} className="px-3 hover:text-accent transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {loading && <p className="text-center text-muted-foreground text-sm">...</p>}

        {!loading && searched && results.length === 0 && (
          <p className="text-center text-muted-foreground">No results found for &quot;{query}&quot;</p>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map(product => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden bg-secondary/10 aspect-[3/4]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <button
                    onClick={() => toggleFavorite({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category })}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                    aria-label={t.featured.addToFavorites}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(product.id) ? "fill-accent text-accent" : "text-foreground"}`} />
                  </button>
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] tracking-[0.15em] px-2 py-1 uppercase">{t.featured.new}</span>
                  )}
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{catKey(product.category)}</p>
                  <h3 className="text-sm font-medium leading-snug">{product.name}</h3>
                  <p className="text-sm font-serif">{product.price.toLocaleString()} <span className="text-xs text-muted-foreground font-sans">{t.products.currency}</span></p>
                  <button
                    onClick={() => handleAdd(product)}
                    className="w-full border border-primary text-primary py-2 text-xs tracking-[0.15em] uppercase hover:bg-primary hover:text-primary-foreground transition-all mt-2"
                  >
                    {t.featured.add}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}