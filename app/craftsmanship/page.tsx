"use client"

import { useI18n } from "@/lib/i18n-context"

export default function CraftsmanshipPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32 bg-secondary/20">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.craftsmanship}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">
              {t.heritage.title1}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.heritage.desc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="space-y-4 text-center p-8 border border-border">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
              </div>
              <h3 className="font-serif text-xl">Savoir-Faire Artisanal</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Chaque pièce est façonnée par nos maîtres artisans selon des techniques transmises depuis 1847, alliant précision et passion.</p>
            </div>
            <div className="space-y-4 text-center p-8 border border-border">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="font-serif text-xl">Sélection des Matériaux</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Nous sélectionnons les plus beaux matériaux : cuirs pleine fleur, soies sauvages, cachemire de Mongolie et diamants de première eau.</p>
            </div>
            <div className="space-y-4 text-center p-8 border border-border">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <h3 className="font-serif text-xl">Finitions d&apos;Exception</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Chaque détail est peaufiné à la main : coutures invisibles, doublures en soie naturelle, et fermetures gravées de notre signature.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
