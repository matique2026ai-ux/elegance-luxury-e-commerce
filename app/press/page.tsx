"use client"

import { useI18n } from "@/lib/i18n-context"
import { Award, Quote } from "lucide-react"

export default function PressPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32 bg-secondary/20">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.press}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{t.press.title1} <span className="italic">{t.press.title2}</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.press.awardsDesc}</p>
          </div>

          <div className="max-w-5xl mx-auto space-y-16">
            <div>
              <h2 className="font-serif text-3xl mb-8 flex items-center gap-3">
                <Quote className="w-6 h-6 text-accent" />
                {t.press.featured}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {(t.press.features as { quote: string; publication: string; year: string }[]).map((f, i) => (
                  <div key={i} className="p-8 bg-background border border-border">
                    <p className="text-lg italic mb-6 leading-relaxed">&ldquo;{f.quote}&rdquo;</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">{f.publication}</span>
                      <span className="text-muted-foreground">{f.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl mb-8 flex items-center gap-3">
                <Award className="w-6 h-6 text-accent" />
                {t.press.awardsTitle}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl">{t.press.awardsDesc}</p>
              <div className="grid md:grid-cols-3 gap-6">
                {(t.press.awards as { name: string; org: string; year: string }[]).map((a, i) => (
                  <div key={i} className="p-8 bg-background border border-border text-center">
                    <Award className="w-10 h-10 text-accent mx-auto mb-4" />
                    <h3 className="font-medium mb-1">{a.name}</h3>
                    <p className="text-sm text-muted-foreground">{a.org} — {a.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
