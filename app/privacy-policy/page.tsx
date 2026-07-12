"use client"

import { useI18n } from "@/lib/i18n-context"
import { Shield, Lock, Eye, Mail, Trash2, Cookie, Database, FileText } from "lucide-react"

const icons = [Shield, Database, Eye, Lock, Mail, Cookie, Trash2, FileText]

export default function PrivacyPolicyPage() {
  const { t } = useI18n()
  const p = t.privacy

  const sections = [
    { icon: Shield, title: p.commitment, content: p.commitmentContent },
    { icon: Database, title: p.dataCollected, content: p.dataCollectedContent },
    { icon: Eye, title: p.purposes, content: p.purposesContent },
    { icon: Lock, title: p.legalBasis, content: p.legalBasisContent },
    { icon: Mail, title: p.sharing, content: p.sharingContent },
    { icon: Cookie, title: p.retention, content: p.retentionContent },
    { icon: Trash2, title: p.rights, content: p.rightsContent },
    { icon: FileText, title: p.dpo, content: p.dpoContent },
  ]

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.privacy}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{p.title}</h1>
            <p className="text-muted-foreground">{p.updated}</p>
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
