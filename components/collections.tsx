"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

const categories = [
  {
    id: "men",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=800&fit=crop",
    count: 42,
  },
  {
    id: "women",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    count: 56,
  },
  {
    id: "children",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&h=800&fit=crop",
    count: 28,
  },
];

export function Collections() {
  const { t } = useI18n();

  const labels: Record<string, { name: string; desc: string }> = {
    men: { name: t.collections.men, desc: t.collections.menDesc },
    women: { name: t.collections.women, desc: t.collections.womenDesc },
    children: { name: t.collections.children, desc: t.collections.childrenDesc },
  };

  return (
    <section id="collections" className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
              {t.collections.label}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight">
              {t.collections.title1}
              <span className="italic text-accent"> {t.collections.title2}</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300 self-start md:self-auto"
          >
            {t.collections.cta}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, index) => {
            const info = labels[cat.id];
            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className={`group relative overflow-hidden ${index === 1 ? "md:translate-y-12" : ""}`}
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={cat.image || "/placeholder.svg"}
                    alt={info.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-background/70 mb-2">
                      {cat.count} items
                    </p>
                    <h3 className="font-serif text-3xl md:text-4xl text-background mb-2">
                      {info.name}
                    </h3>
                    <p className="text-background/70 text-sm max-w-xs">
                      {info.desc}
                    </p>
                    <div className="absolute top-6 right-6 w-10 h-10 border border-background/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className="w-5 h-5 text-background" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
