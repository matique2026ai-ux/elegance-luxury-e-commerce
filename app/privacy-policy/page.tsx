"use client"

import { useI18n } from "@/lib/i18n-context"
import { Shield, Lock, Eye, Mail, Trash2, Cookie, Database, FileText } from "lucide-react"

const sections = [
  {
    icon: Shield,
    title: "Notre Engagement",
    content: "MAISON HERAHIMA SAS accorde une importance capitale à la protection de vos données personnelles. La présente politique de confidentialité vous informe de la manière dont nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site herahima.com."
  },
  {
    icon: Database,
    title: "Données Collectées",
    content: "Nous collectons les données suivantes : nom, prénom, adresse email, adresse postale, numéro de téléphone, informations de paiement, historique d'achat, préférences de produits, et données de navigation (cookies). Ces données sont collectées lors de votre inscription, de vos achats, de votre navigation ou de vos communications avec notre service client."
  },
  {
    icon: Eye,
    title: "Finalités du Traitement",
    content: "Vos données sont utilisées pour : traiter et expédier vos commandes, gérer votre compte client, vous offrir une expérience personnalisée, vous envoyer des communications marketing (avec votre consentement), améliorer nos services, et respecter nos obligations légales (facturation, comptabilité)."
  },
  {
    icon: Lock,
    title: "Base Légale du Traitement",
    content: "Le traitement de vos données repose sur : l'exécution du contrat (gestion des commandes), votre consentement (communications marketing, cookies non essentiels), notre intérêt légitime (amélioration des services, sécurité), et les obligations légales (facturation, comptabilité)."
  },
  {
    icon: Mail,
    title: "Partage des Données",
    content: "Vos données peuvent être partagées avec : nos prestataires de paiement (Stripe), nos transporteurs (DHL, FedEx), notre hébergeur (Vercel), et nos partenaires marketing (avec votre consentement). Nous ne vendons jamais vos données personnelles à des tiers."
  },
  {
    icon: Cookie,
    title: "Durée de Conservation",
    content: "Nous conservons vos données aussi longtemps que nécessaire aux fins pour lesquelles elles ont été collectées : données de compte (jusqu'à la clôture du compte), données de commande (5 ans après la commande pour obligations comptables), données de navigation (13 mois pour les cookies), et données marketing (3 ans après le dernier contact)."
  },
  {
    icon: Trash2,
    title: "Vos Droits RGPD",
    content: "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants : droit d'accès (obtenir une copie de vos données), droit de rectification (corriger vos données), droit à l'effacement (suppression de vos données), droit à la limitation du traitement, droit à la portabilité des données, et droit d'opposition au traitement. Pour exercer ces droits, contactez-nous à privacy@herahima.com."
  },
  {
    icon: FileText,
    title: "Délégué à la Protection des Données",
    content: "Nous avons désigné un Délégué à la Protection des Données (DPO) que vous pouvez contacter pour toute question relative à vos données personnelles : DPO - MAISON HERAHIMA SAS, 24 Place Vendôme, 75001 Paris, France. Email : dpo@herahima.com."
  },
]

export default function PrivacyPolicyPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.privacy}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{t.footer.privacy}</h1>
            <p className="text-muted-foreground">Dernière mise à jour : juillet 2026</p>
          </div>

          <div className="space-y-10">
            {sections.map((s, i) => {
              const Icon = s.icon
              return (
                <section key={i} className="space-y-3">
                  <h2 className="font-serif text-xl flex items-center gap-3">
                    <Icon className="w-5 h-5 text-accent shrink-0" />
                    {s.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
