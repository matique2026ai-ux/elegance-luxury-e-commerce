"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";

interface Product {
  id: number; name: string; category: string; sub: string; price: number; image: string; isNew: boolean
}

export function FeaturedProducts() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { t, lang } = useI18n();
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    fetch(`/api/products?lang=${lang}`).then(r => r.ok ? r.json() : []).then(setAllProducts).catch(() => setAllProducts([]));
  }, [lang]);

  const filtered = activeCategory === "all" ? allProducts : allProducts.filter(p => p.category === activeCategory);
  const tabs = [
    { id: "all", label: t.products.categories.all },
    { id: "men", label: t.featured.shopMen },
    { id: "women", label: t.featured.shopWomen },
    { id: "children", label: t.featured.shopChildren },
  ];

  if (allProducts.length === 0) return null;

  return (
    <section id="selection" className="py-24 md:py-32">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div className="space-y-4">
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
                {t.featured.label}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight">
                {t.featured.title1}
                <span className="italic text-accent"> {t.featured.title2}</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md md:text-right md:ml-auto">
              {t.featured.subtitle}
            </p>
          </div>

          <div className="flex gap-6 mt-12 border-b border-border pb-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`text-sm tracking-[0.2em] uppercase pb-4 -mb-4 transition-colors duration-300 ${
                  activeCategory === tab.id ? "text-accent border-b-2 border-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((product, index) => (
            <div
              key={product.id}
              className={`group ${index % 2 === 1 ? "md:mt-12" : ""}`}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden mb-4">
                <div className="aspect-[5/6] bg-secondary overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 text-[10px] tracking-[0.2em] uppercase">
                    {t.featured.new}
                  </span>
                )}
                <div
                  className={`absolute inset-x-4 bottom-4 flex gap-2 transition-all duration-300 ${
                    hoveredId === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1, category: product.category })}
                    className="flex-1 bg-background/90 backdrop-blur-sm py-3 flex items-center justify-center gap-2 text-sm tracking-[0.1em] uppercase hover:bg-background transition-colors duration-200 min-h-11"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {t.featured.add}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFavorite({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category })}
                    className="w-11 h-11 bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors duration-200"
                    aria-label={isFavorite(product.id) ? t.featured.removeFromFavorites : t.featured.addToFavorites}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(product.id) ? "fill-accent text-accent" : ""}`} />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{product.sub}</p>
                <h3 className="font-serif text-xl group-hover:text-accent transition-colors duration-300">{product.name}</h3>
                <p className="text-lg">{product.price.toLocaleString()} {t.products.currency}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center border border-primary text-primary px-10 py-4 text-sm tracking-[0.2em] uppercase min-h-12 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {t.featured.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
