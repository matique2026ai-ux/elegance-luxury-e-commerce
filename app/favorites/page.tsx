"use client"

import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useFavorites } from "@/context/favorites-context"
import { useCart } from "@/context/cart-context"
import { useI18n } from "@/lib/i18n-context"

export default function FavoritesPage() {
  const { items: favorites, toggleFavorite } = useFavorites()
  const { addItem } = useCart()
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{t.favorites.title}</h1>
          <p className="text-muted-foreground">{favorites.length} {t.favorites.items}</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">{t.favorites.empty}</p>
            <Link href="/products" className="text-sm tracking-wider uppercase underline">{t.favorites.browse}</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {favorites.map(p => (
              <div key={p.id} className="group">
                <Link href={`/products/${p.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-secondary/20">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                      <button onClick={(e) => { e.preventDefault(); addItem({ id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1, category: p.category }) }} className="bg-white text-black p-3 hover:bg-accent transition-colors"><ShoppingBag className="w-5 h-5" /></button>
                      <button onClick={(e) => { e.preventDefault(); toggleFavorite(p) }} className="bg-white text-black p-3 hover:bg-accent transition-colors"><Heart className="w-5 h-5 fill-accent text-accent" /></button>
                    </div>
                  </div>
                </Link>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg">{p.name}</h3>
                  <p className="font-medium">{p.price.toLocaleString()} {t.products.currency}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
