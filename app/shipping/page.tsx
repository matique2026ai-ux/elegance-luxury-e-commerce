"use client"

import { Package, Truck, RotateCcw, Globe, Shield, Clock } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

const iconList = [Truck, Package, RotateCcw, Globe, Shield, Clock]

export default function ShippingPage() {
  const { t } = useI18n()
  const items = t.shippingPage.items as { title: string; desc: string }[]

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.shipping}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{t.footer.shipping}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.services.desc}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {items.map((item, i) => {
              const Icon = iconList[i]
              return (
                <div key={i} className="p-8 border border-border hover:bg-secondary/10 transition-colors">
                  <Icon className="w-8 h-8 mb-4 text-accent" />
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
