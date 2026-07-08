"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useI18n } from "@/lib/i18n-context"
import { ShoppingBag, Heart } from "lucide-react"
import Link from "next/link"

const allProducts = [
  { id: 1, name: "Wool Tailored Suit", category: "men", sub: "Clothing", price: 3200, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop", isNew: true },
  { id: 2, name: "Linen Blazer", category: "men", sub: "Clothing", price: 1800, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop", isNew: false },
  { id: 3, name: "Leather Oxford Shoes", category: "men", sub: "Shoes", price: 1450, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&h=600&fit=crop", isNew: false },
  { id: 4, name: "Cashmere Scarf", category: "men", sub: "Accessories", price: 680, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=600&fit=crop", isNew: true },
  { id: 5, name: "Eau de Parfum", category: "men", sub: "Fragrances", price: 320, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop", isNew: true },
  { id: 6, name: "Silk Evening Gown", category: "women", sub: "Clothing", price: 8750, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop", isNew: true },
  { id: 7, name: "Pearl Necklace", category: "women", sub: "Accessories", price: 4890, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop", isNew: true },
  { id: 8, name: "Leather Duchess Bag", category: "women", sub: "Accessories", price: 2450, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop", isNew: false },
  { id: 9, name: "Floral Summer Dress", category: "women", sub: "Clothing", price: 1200, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92b1?w=500&h=600&fit=crop", isNew: false },
  { id: 10, name: "Sapphire Ring", category: "women", sub: "Accessories", price: 12500, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=600&fit=crop", isNew: false },
  { id: 11, name: "Stiletto Heels", category: "women", sub: "Shoes", price: 980, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop", isNew: true },
  { id: 12, name: "Eau de Parfum Rose", category: "women", sub: "Fragrances", price: 380, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop", isNew: false },
  { id: 13, name: "Cashmere Cardigan", category: "children", sub: "Clothing", price: 480, image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&h=600&fit=crop", isNew: false },
  { id: 14, name: "Mini Leather Sneakers", category: "children", sub: "Shoes", price: 280, image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&h=600&fit=crop", isNew: true },
  { id: 15, name: "Kids Silk Bow Tie", category: "children", sub: "Accessories", price: 150, image: "https://images.unsplash.com/photo-1602173211822-8347a13dc5ad?w=500&h=600&fit=crop", isNew: true },
  { id: 16, name: "Velvet Party Dress", category: "children", sub: "Clothing", price: 650, image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&h=600&fit=crop", isNew: true },
]

function ProductsContent() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeSub, setActiveSub] = useState("all")

  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat) setActiveCategory(cat)
  }, [searchParams])

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

  const filtered = allProducts.filter(p => {
    const catMatch = activeCategory === "all" || p.category === activeCategory
    const subMatch = activeSub === "all" || p.sub === activeSub
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

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden mb-4">
                <div className="aspect-[5/6] bg-secondary overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 text-[10px] tracking-[0.2em] uppercase">{t.featured.new}</span>
                )}
                <div className="absolute inset-x-4 bottom-4 flex gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4">
                  <button type="button" className="flex-1 bg-background/90 backdrop-blur-sm py-3 flex items-center justify-center gap-2 text-sm tracking-[0.1em] uppercase hover:bg-background transition-colors duration-200 min-h-11">
                    <ShoppingBag className="w-4 h-4" />{t.featured.add}
                  </button>
                  <button type="button" className="w-11 h-11 bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors duration-200" aria-label="Add to favorites">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{product.sub}</p>
                <h3 className="font-serif text-xl group-hover:text-accent transition-colors duration-300">{product.name}</h3>
                <p className="text-lg">${product.price.toLocaleString("en-US")}</p>
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
      <Header />
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
      <Footer />
    </main>
  )
}
