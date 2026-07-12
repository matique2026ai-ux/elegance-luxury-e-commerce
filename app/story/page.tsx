"use client"

import { useI18n } from "@/lib/i18n-context"

export default function StoryPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">{t.heritage.label}</p>
                <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.1]">
                  {t.heritage.title1}
                  <span className="block italic text-accent">{t.heritage.title2}</span>
                  {t.heritage.title3}
                </h1>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">{t.heritage.desc}</p>
              <div className="grid grid-cols-3 gap-8 py-8 border-y border-border">
                <div>
                  <p className="font-serif text-4xl md:text-5xl text-accent">178</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.heritage.years}</p>
                </div>
                <div>
                  <p className="font-serif text-4xl md:text-5xl text-accent">47</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.heritage.artisans}</p>
                </div>
                <div>
                  <p className="font-serif text-4xl md:text-5xl text-accent">12k</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.heritage.unique}</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%282%29-qsHmoJIZtkh9Zw7PIDspOZVh50aE2F.png" alt="Heritage" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
