"use client"

import { useI18n } from "@/lib/i18n-context"
import { Cookie, Settings, BarChart3, Shield, X, Check, Lock } from "lucide-react"

const catIcons = [Cookie, BarChart3, Settings, Shield]

export default function CookiesPage() {
  const { t } = useI18n()
  const categories = t.cookies.categories as { title: string; desc: string; required: boolean; items: string[] }[]

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.cookies}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{t.cookies.title}</h1>
            <p className="text-muted-foreground">{t.cookies.updated}</p>
          </div>

          <div className="space-y-10">
            <p className="text-sm text-muted-foreground leading-relaxed">{t.cookies.intro}</p>

            <div className="space-y-6">
              {categories.map((cat, i) => {
                const Icon = catIcons[i]
                return (
                  <div key={i} className="p-6 border border-border">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-accent" />
                        <h2 className="font-medium">{cat.title}</h2>
                      </div>
                      {cat.required ? (
                        <span className="text-xs px-2 py-1 bg-accent/10 text-accent flex items-center gap-1"><Lock className="w-3 h-3" />{t.cookies.alwaysActive}</span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground">{t.cookies.optional}</span>
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
                )
              })}
            </div>

            <section className="space-y-4">
              <h2 className="font-serif text-xl">{t.cookies.manage}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.cookies.manageContent}</p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="p-4 border border-border text-center">
                  <X className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium mb-1">{t.cookies.rejectAll}</p>
                  <p className="text-muted-foreground text-xs">{t.cookies.alwaysActive}</p>
                </div>
                <div className="p-4 border border-accent text-center bg-accent/5">
                  <Cookie className="w-5 h-5 mx-auto mb-2 text-accent" />
                  <p className="font-medium mb-1">{t.cookies.customize}</p>
                  <p className="text-muted-foreground text-xs">{t.cookies.manage}</p>
                </div>
                <div className="p-4 border border-border text-center">
                  <Check className="w-5 h-5 mx-auto mb-2 text-accent" />
                  <p className="font-medium mb-1">{t.cookies.acceptAll}</p>
                  <p className="text-muted-foreground text-xs">{t.cookies.optional}</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl">{t.cookies.contact}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.cookies.contactContent}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl">{t.cookies.update}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.cookies.updateContent}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
