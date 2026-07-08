"use client"

import { useState, useEffect } from "react"
import { Package, Truck, RotateCcw, Headphones, type LucideIcon } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useI18n } from "@/lib/i18n-context"

const icons: LucideIcon[] = [Truck, Package, RotateCcw, Headphones]

export default function ServicesPage() {
  const { t } = useI18n()
  const [content, setContent] = useState<{ title: string; subtitle: string; description: string; images: string[] } | null>(null)

  useEffect(() => {
    fetch("/api/content?page=services").then(r => r.json()).then(setContent)
  }, [])

  return (
    <div className="min-h-screen pt-28">
      <Header />
      <div className="py-24 md:py-32 bg-secondary/20">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-4 lg:space-y-6">
                  <div className="aspect-[3/4] relative overflow-hidden shadow-elegant">
                    <img src={content?.images?.[0] || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Emballage%20Luxe%203-O7x3bwTICrWOx8qXrukiyPtc260H9T.png"} alt="Luxury packaging" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-accent p-6 lg:p-8 shadow-elegant">
                    <p className="font-serif text-4xl text-accent-foreground mb-2">24/7</p>
                    <p className="text-sm text-accent-foreground/80">{t.services.concierge}</p>
                  </div>
                </div>
                <div className="space-y-4 lg:space-y-6 pt-12">
                  <div className="bg-card p-6 lg:p-8 shadow-elegant">
                    <p className="font-serif text-4xl mb-2">150+</p>
                    <p className="text-sm text-muted-foreground">{t.services.countries}</p>
                  </div>
                  <div className="aspect-[3/4] relative overflow-hidden shadow-elegant">
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Livraison%20Luxe%201-j8zso7zcVQvNSvPmorDLIZLHTObiYW.png" alt="Luxury delivery" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-12">
              <div className="space-y-4">
                <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">{t.services.label}</p>
                <h1 className="font-serif text-5xl md:text-7xl tracking-tight">{content?.title || t.services.title1}</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">{content?.description || t.services.desc}</p>
              </div>
              <div className="space-y-6">
                {t.services.items.map((item: { title: string; desc: string; detail: string; }, i: number) => {
                  const Icon = icons[i]
                  return (
                    <div key={i} className="flex gap-6">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                        {Icon && <Icon className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
