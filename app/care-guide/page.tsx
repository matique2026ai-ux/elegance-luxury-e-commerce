"use client"

import { Droplets, Sun, Shield, Sparkles, Package, RefreshCw } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

const tips = [
  { icon: Droplets, title: "Nettoyage", desc: "Utilisez un chiffon doux et sec pour les surfaces lisses. Pour les tissus délicats, un nettoyage à sec professionnel est recommandé." },
  { icon: Sun, title: "Protection Solaire", desc: "Évitez l'exposition prolongée au soleil direct qui peut altérer les couleurs et les matières naturelles." },
  { icon: Shield, title: "Stockage", desc: "Conservez vos pièces dans leur housse de protection, à l'abri de l'humidité et de la poussière." },
  { icon: Sparkles, title: "Entretien Quotidien", desc: "Brossez délicatement les surfaces en cuir avec une brosse douce pour préserver leur éclat naturel." },
  { icon: Package, title: "Voyage", desc: "Utilisez nos pochettes de voyage pour protéger vos pièces lors de vos déplacements." },
  { icon: RefreshCw, title: "Service Atelier", desc: "Notre atelier offre un service d'entretien et de réparation à vie. Prenez rendez-vous pour une consultation." },
]

export default function CareGuidePage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.care}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{t.footer.care}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Conseils d&apos;expert pour préserver la beauté et la longévité de vos pièces Herahima.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tips.map((tip, i) => {
              const Icon = tip.icon
              return (
                <div key={i} className="p-8 border border-border hover:bg-secondary/10 transition-colors">
                  <Icon className="w-8 h-8 mb-4 text-accent" />
                  <h3 className="font-medium mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
