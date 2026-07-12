"use client"

import { useI18n } from "@/lib/i18n-context"

export default function CraftsmanshipPage() {
  const { t } = useI18n()
  const items = t.craftsmanship.items as { title: string; desc: string }[]

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32 bg-secondary/20">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.craftsmanship}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{t.craftsmanship.title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.craftsmanship.desc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {items.map((item, i) => (
              <div key={i} className="space-y-4 text-center p-8 border border-border">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                </div>
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
