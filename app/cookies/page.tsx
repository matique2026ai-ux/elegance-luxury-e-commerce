"use client"

import { useI18n } from "@/lib/i18n-context"
import { Cookie, Settings, BarChart3, Shield, X, Check, Lock } from "lucide-react"

const categories = [
  {
    icon: Cookie,
    title: "Cookies Essentiels",
    desc: "Nécessaires au fonctionnement du site. Ils permettent la navigation, l'accès à votre compte et la gestion de vos commandes.",
    required: true,
    items: ["Authentification et session", "Gestion du panier d'achat", "Sécurité et prévention de la fraude", "Mémorisation des préférences de langue"]
  },
  {
    icon: BarChart3,
    title: "Cookies Analytiques",
    desc: "Nous aident à comprendre comment les visiteurs interagissent avec notre site afin d'améliorer votre expérience.",
    required: false,
    items: ["Mesure de l'audience et des visites", "Analyse des pages les plus consultées", "Suivi des parcours de navigation", "Identification des erreurs et des lenteurs"]
  },
  {
    icon: Settings,
    title: "Cookies Marketing",
    desc: "Utilisés pour vous proposer des publicités pertinentes et mesurer l'efficacité de nos campagnes marketing.",
    required: false,
    items: ["Personnalisation des publicités", "Mesure de l'efficacité des campagnes", "Ciblage basé sur vos centres d'intérêt", "Suivi des conversions"]
  },
  {
    icon: Shield,
    title: "Cookies de Réseaux Sociaux",
    desc: "Permettent le partage de contenu sur les réseaux sociaux et l'interaction avec nos pages officielles.",
    required: false,
    items: ["Boutons de partage (Instagram, Pinterest)", "Lectures de vidéos intégrées", "Suivi des interactions sociales"]
  }
]

export default function CookiesPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.cookies}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{t.footer.cookies}</h1>
            <p className="text-muted-foreground">Dernière mise à jour : juillet 2026</p>
          </div>

          <div className="space-y-10">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sur notre site herahima.com, nous utilisons des cookies pour améliorer votre expérience de navigation,
              analyser notre trafic et vous proposer des contenus personnalisés. Cette politique vous explique ce que sont
              les cookies, comment nous les utilisons et comment vous pouvez les gérer.
            </p>

            <div className="space-y-6">
              {categories.map((cat, i) => (
                <div key={i} className="p-6 border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <cat.icon className="w-5 h-5 text-accent" />
                      <h2 className="font-medium">{cat.title}</h2>
                    </div>
                    {cat.required ? (
                      <span className="text-xs px-2 py-1 bg-accent/10 text-accent flex items-center gap-1"><Lock className="w-3 h-3" /> Toujours actif</span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-muted text-muted-foreground">Optionnel</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{cat.desc}</p>
                  <ul className="space-y-1.5">
                    {cat.items.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                        <Check className="w-3 h-3 text-accent shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <section className="space-y-4">
              <h2 className="font-serif text-xl">Gérer vos Préférences</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Vous pouvez à tout moment modifier vos préférences en matière de cookies en cliquant sur le lien
                &ldquo;Gérer mes cookies&rdquo; en bas de chaque page. Vous pouvez également configurer votre navigateur
                pour refuser les cookies. Notez que certains cookies sont nécessaires au fonctionnement du site et ne
                peuvent pas être désactivés.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="p-4 border border-border text-center">
                  <X className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium mb-1">Refuser Tout</p>
                  <p className="text-muted-foreground text-xs">Uniquement les cookies essentiels</p>
                </div>
                <div className="p-4 border border-accent text-center bg-accent/5">
                  <Cookie className="w-5 h-5 mx-auto mb-2 text-accent" />
                  <p className="font-medium mb-1">Personnaliser</p>
                  <p className="text-muted-foreground text-xs">Choisir par catégorie</p>
                </div>
                <div className="p-4 border border-border text-center">
                  <Check className="w-5 h-5 mx-auto mb-2 text-accent" />
                  <p className="font-medium mb-1">Accepter Tout</p>
                  <p className="text-muted-foreground text-xs">Tous les cookies</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl">Contact</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pour toute question concernant notre utilisation des cookies, contactez notre DPO à l&apos;adresse :
                dpo@herahima.com
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl">Mise à Jour</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cette politique relative aux cookies peut être modifiée à tout moment. Nous vous encourageons à la
                consulter régulièrement. La date de la dernière mise à jour est indiquée en haut de cette page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
