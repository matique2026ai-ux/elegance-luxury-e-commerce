"use client"

import { useI18n } from "@/lib/i18n-context"
import { Leaf, Heart, Shield, RefreshCw } from "lucide-react"

const icons = [Leaf, Heart, Shield, RefreshCw]

export default function CommitmentsPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.commitments}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">
              {t.sustainability.title1} <span className="italic">{t.sustainability.title2}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.sustainability.desc}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {(t.sustainability.items as { title: string; desc: string }[]).map((item, i) => {
              const Icon = icons[i]
              return (
                <div key={i} className="flex gap-6 p-8 border border-border hover:bg-secondary/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    {Icon && <Icon className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
