"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

const faqs = [
  { q: "Comment passer une commande ?", a: "Parcourez notre collection, sélectionnez vos pièces et ajoutez-les à votre panier. Suivez le processus de commande pour finaliser votre achat." },
  { q: "Quels sont les délais de livraison ?", a: "Nous livrons dans le monde entier sous 2 à 5 jours ouvrés. Chaque commande est expédiée avec un service de livraison en voiture blanche." },
  { q: "Puis-je retourner un article ?", a: "Oui, vous disposez de 30 jours pour retourner tout article dans son état d'origine. Les retours sont gratuits." },
  { q: "Comment entretenir mes pièces ?", a: "Chaque pièce est accompagnée d'un guide d'entretien. Nous offrons également un service d'entretien à vie dans notre atelier." },
  { q: "Proposez-vous des services de personnalisation ?", a: "Oui, notre atelier propose des services de personnalisation exclusifs. Contactez notre équipe pour en savoir plus." },
  { q: "Comment puis-je contacter le service client ?", a: "Vous pouvez nous joindre par email à contact@herahima.com ou par téléphone au +33 1 42 60 00 00." },
]

export default function FAQPage() {
  const { t } = useI18n()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.faq}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{t.footer.faq}</h1>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-secondary/10 transition-colors">
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
