"use client";

import { Play } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export function Heritage() {
  const { t } = useI18n();

  return (
    <section id="heritage" className="py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="space-y-8 lg:pr-12">
            <div className="space-y-4">
              <p className="text-sm tracking-[0.3em] uppercase text-primary-foreground/60">
                {t.heritage.label}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
                {t.heritage.title1}
                <span className="block italic text-accent">{t.heritage.title2}</span>
                {t.heritage.title3}
              </h2>
            </div>

            <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-lg">
              {t.heritage.desc}
            </p>

            <div className="grid grid-cols-3 gap-8 py-8 border-y border-primary-foreground/20">
              <div>
                <p className="font-serif text-4xl md:text-5xl text-accent">178</p>
                <p className="text-sm text-primary-foreground/60 mt-1">
                  {t.heritage.years}
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl md:text-5xl text-accent">47</p>
                <p className="text-sm text-primary-foreground/60 mt-1">
                  {t.heritage.artisans}
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl md:text-5xl text-accent">12k</p>
                <p className="text-sm text-primary-foreground/60 mt-1">
                  {t.heritage.unique}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-3 border border-primary-foreground text-primary-foreground px-8 py-4 text-sm tracking-[0.2em] uppercase min-h-12 hover:bg-primary-foreground hover:text-primary transition-all duration-300"
            >
              {t.heritage.cta}
            </button>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] lg:aspect-[3/4]">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%282%29-qsHmoJIZtkh9Zw7PIDspOZVh50aE2F.png"
                alt={t.heritage.altImage}
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                className="absolute inset-0 flex items-center justify-center group"
                aria-label={t.heritage.playVideo}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-background/80 flex items-center justify-center group-hover:bg-background/20 transition-colors duration-300">
                  <Play className="w-8 h-8 text-background ml-1" />
                </div>
              </button>

              <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 bg-accent p-6 md:p-8 max-w-[280px]">
                <p className="font-serif text-accent-foreground text-lg md:text-xl italic leading-snug">
                  {t.heritage.quote}
                </p>
                <p className="text-accent-foreground/70 text-sm mt-3">
                  {t.heritage.quoteAuthor}
                </p>
              </div>
            </div>

            <div className="absolute -top-8 -right-4 md:-right-8 w-24 h-24 md:w-32 md:h-32 border border-accent/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
