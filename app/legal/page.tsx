"use client"

import { useI18n } from "@/lib/i18n-context"
import { Scale, FileText, Building, MapPin } from "lucide-react"

export default function LegalPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.legal}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{t.footer.legal}</h1>
          </div>

          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="font-serif text-2xl flex items-center gap-3"><Building className="w-5 h-5 text-accent" />Éditeur du Site</h2>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p>Le site herahima.com est édité par :</p>
                <p><strong>MAISON HERAHIMA SAS</strong></p>
                <p>Société par Actions Simplifiée au capital de 1 000 000 €</p>
                <p>RCS Paris : 912 345 678</p>
                <p>Numéro de TVA Intracommunautaire : FR 12 912345678</p>
                <p className="flex items-start gap-2 mt-4"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />Siège social : 24 Place Vendôme, 75001 Paris, France</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl flex items-center gap-3"><Scale className="w-5 h-5 text-accent" />Directeur de la Publication</h2>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p>Directeur de la publication : Henri Herahima</p>
                <p>Contact : contact@herahima.com</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl flex items-center gap-3"><FileText className="w-5 h-5 text-accent" />Hébergement</h2>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p>Ce site est hébergé par :</p>
                <p><strong>Vercel Inc.</strong></p>
                <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
                <p>Site web : vercel.com</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl">Propriété Intellectuelle</h2>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p>L&apos;ensemble du contenu du site herahima.com, incluant notamment les textes, images, vidéos, logos, marques et designs, est la propriété exclusive de MAISON HERAHIMA SAS ou de ses partenaires et est protégé par les lois françaises et internationales sur la propriété intellectuelle.</p>
                <p>Toute reproduction, représentation, modification ou exploitation du contenu, totale ou partielle, sans autorisation écrite préalable de MAISON HERAHIMA SAS est strictement interdite et pourra donner lieu à des poursuites judiciaires.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl">Responsabilité</h2>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p>MAISON HERAHIMA SAS s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations publiées sur ce site. Toutefois, la société ne saurait garantir l&apos;exhaustivité, l&apos;exactitude ou l&apos;actualité des informations.</p>
                <p>MAISON HERAHIMA SAS décline toute responsabilité en cas de dommages directs ou indirects résultant de l&apos;utilisation du site ou de l&apos;impossibilité d&apos;y accéder.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl">Droit Applicable</h2>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p>Les présentes mentions légales sont régies par le droit français. Tout litige relatif à l&apos;utilisation du site sera soumis à la compétence exclusive des tribunaux de Paris.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
