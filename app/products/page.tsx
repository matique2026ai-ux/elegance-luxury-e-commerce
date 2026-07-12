"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useI18n } from "@/lib/i18n-context"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"
import { ShoppingBag, Heart } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number; name: string; category: string; sub: string; subKey: string; price: number; image: string; isNew: boolean
}

function ProductsContent() {
  const { t, lang } = useI18n()
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeSub, setActiveSub] = useState("all")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat) setActiveCategory(cat)
  }, [searchParams])

  useEffect(() => {
    setLoading(true)
    fetch(`/api/products?lang=${lang}`).then(r => r.ok ? r.json() : []).then(setProducts).catch(() => setProducts([])).finally(() => setLoading(false))
  }, [lang])

  const categories = [
    { id: "all", label: t.products.categories.all },
    { id: "men", label: t.products.categories.men },
    { id: "women", label: t.products.categories.women },
    { id: "children", label: t.products.categories.children },
  ]

  const subcategories = [
    { id: "all", label: t.products.categories.all },
    { id: "Clothing", label: t.products.categories.clothing },
    { id: "Shoes", label: t.products.categories.shoes },
    { id: "Accessories", label: t.products.categories.accessories },
    { id: "Fragrances", label: t.products.categories.fragrances },
  ]

  const filtered = products.filter(p => {
    const catMatch = activeCategory === "all" || p.category === activeCategory
    const subMatch = activeSub === "all" || p.subKey === activeSub
    return catMatch && subMatch
  })

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.id === "all" ? "/products" : `/products?category=${cat.id}`}
            className={`px-6 py-3 text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:bg-secondary"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {subcategories.map((sub) => (
          <button
            key={sub.id}
            type="button"
            onClick={() => setActiveSub(sub.id)}
            className={`px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-200 ${
              activeSub === sub.id
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground py-12">{t.products.loading}</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">{t.products.empty}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((product) => (
            <div key={product.id} className="group">
              <Link href={`/products/${product.id}`}>
                <div className="relative overflow-hidden mb-4">
                  <div className="aspect-[5/6] bg-secondary overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 text-[10px] tracking-[0.2em] uppercase">{t.featured.new}</span>
                  )}
                  <div className="absolute inset-x-4 bottom-4 flex gap-2 transition-all duration-300 sm:opacity-0 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:translate-y-0">
                    <button type="button" onClick={(e) => { e.preventDefault(); addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1, category: product.category }) }} className="flex-1 bg-background/90 backdrop-blur-sm py-3 flex items-center justify-center gap-2 text-sm tracking-[0.1em] uppercase hover:bg-background transition-colors duration-200 min-h-11">
                      <ShoppingBag className="w-4 h-4" />{t.featured.add}
                    </button>
                    <button type="button" onClick={(e) => { e.preventDefault(); toggleFavorite({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category }) }} className="w-11 h-11 bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors duration-200" aria-label={isFavorite(product.id) ? t.featured.removeFromFavorites : t.featured.addToFavorites}>
                      <Heart className={`w-4 h-4 ${isFavorite(product.id) ? "fill-accent text-accent" : ""}`} />
                    </button>
                  </div>
                </div>
              </Link>
              <div className="space-y-1">
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{product.sub}</p>
                <h3 className="font-serif text-xl group-hover:text-accent transition-colors duration-300">{product.name}</h3>
                <p className="text-lg">{product.price.toLocaleString()} {t.products.currency}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default function ProductsPage() {
  const { t } = useI18n()

  return (
    <main className="min-h-screen">
      <div className="pt-32 pb-16">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-6xl tracking-tight mb-4">{t.products.title}</h1>
          </div>
          <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading...</div>}>
            <ProductsContent />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
