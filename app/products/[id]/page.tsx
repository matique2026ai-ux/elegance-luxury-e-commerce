"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Heart, ShoppingBag, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"

interface Product {
  id: number; name: string; category: string; sub: string; price: number; stock: number; image: string; isNew: boolean
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { t, lang } = useI18n()
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    fetch(`/api/products/${id}?lang=${lang}`)
      .then(r => r.ok ? r.json() : null)
      .then(setProduct)
      .finally(() => setLoading(false))
  }, [id, lang])

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">{t.products.loading}</div>
  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">{t.products.notFound}</p>
        <Link href="/products" className="text-sm tracking-wider uppercase underline">{t.products.backToProducts}</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-24">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" /> {t.products.back}
          </Link>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <div className="relative aspect-[3/4] bg-secondary/20 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.isNew && <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs px-3 py-1 tracking-wider uppercase">{t.featured.new}</span>}
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground tracking-wider uppercase mb-2">{product.sub}</p>
                <h1 className="font-serif text-4xl md:text-5xl tracking-tight">{product.name}</h1>
              </div>
              <p className="text-2xl font-serif">{product.price.toLocaleString()} {t.products.currency}</p>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{t.products.stock}:</span>
                {product.stock > 0 ? (
                  <span className="text-sm text-emerald-600 font-medium">{product.stock} {t.products.available}</span>
                ) : (
                  <span className="text-sm text-destructive font-medium">{t.products.outOfStock}</span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors">−</button>
                  <span className="w-12 text-center text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors">+</button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => { addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity, category: product.category }) }}
                  disabled={product.stock === 0}
                  className="flex-1 bg-primary text-primary-foreground py-4 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <ShoppingBag className="w-5 h-5" /> {t.featured.add}
                </button>
                <button
                  onClick={() => toggleFavorite({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category })}
                  className="w-14 h-14 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label={isFavorite(product.id) ? t.featured.removeFromFavorites : t.featured.addToFavorites}
                >
                  <Heart className={`w-5 h-5 ${isFavorite(product.id) ? "fill-accent text-accent" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
