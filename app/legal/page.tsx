"use client"

import { useI18n } from "@/lib/i18n-context"
import { Scale, FileText, Building, MapPin } from "lucide-react"

export default function LegalPage() {
  const { t } = useI18n()
  const l = t.legal

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.legal}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{l.title}</h1>
          </div>

          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="font-serif text-2xl flex items-center gap-3"><Building className="w-5 h-5 text-accent" />{l.editor}</h2>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p>{l.editorContent}</p>
                <p><strong>{l.company}</strong></p>
                <p>{l.companyDesc}</p>
                <p>{l.rcs}</p>
                <p>{l.vat}</p>
                <p className="flex items-start gap-2 mt-4"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />{l.address}</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl flex items-center gap-3"><Scale className="w-5 h-5 text-accent" />{l.director}</h2>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p>{l.directorName}</p>
                <p>{l.directorContact}</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl flex items-center gap-3"><FileText className="w-5 h-5 text-accent" />{l.hosting}</h2>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p>{l.hostingContent}</p>
                <p><strong>{l.hostingName}</strong></p>
                <p>{l.hostingAddress}</p>
                <p>{l.hostingSite}</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl">{l.intellectual}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{l.intellectualContent}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl">{l.liability}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{l.liabilityContent}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl">{l.law}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{l.lawContent}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
