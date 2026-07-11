"use client"

import { useState, useEffect } from "react"
import { Pencil } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

interface PageContent {
  page: string
  title: string
  subtitle: string
  description: string
  images: string[]
  published: boolean
}

const pages = ["heritage", "services", "boutiques"]
const langs = ["en", "fr", "ar"] as const

const emptyForm = {
  title_en: "", title_fr: "", title_ar: "",
  subtitle_en: "", subtitle_fr: "", subtitle_ar: "",
  description_en: "", description_fr: "", description_ar: "",
  published: true,
}

export default function DashboardContent() {
  const [contentMap, setContentMap] = useState<Record<string, PageContent>>({})
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const { t } = useI18n()
  const d = t.dashboard.content

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then((data: PageContent[]) => {
      const map: Record<string, PageContent> = {}
      data.forEach(c => { map[c.page] = c })
      setContentMap(map)
    })
  }, [])

  function editPage(page: string) {
    const c = contentMap[page]
    setForm({
      title_en: c?.title || "", title_fr: c?.title || "", title_ar: c?.title || "",
      subtitle_en: c?.subtitle || "", subtitle_fr: c?.subtitle || "", subtitle_ar: c?.subtitle || "",
      description_en: c?.description || "", description_fr: c?.description || "", description_ar: c?.description || "",
      published: c?.published ?? true,
    })
    setEditing(page)
  }

  async function save() {
    if (!editing) return
    const body = {
      page: editing,
      title: form.title_en,
      title_fr: form.title_fr,
      title_ar: form.title_ar,
      subtitle: form.subtitle_en,
      subtitle_fr: form.subtitle_fr,
      subtitle_ar: form.subtitle_ar,
      description: form.description_en,
      description_fr: form.description_fr,
      description_ar: form.description_ar,
      published: form.published ? 1 : 0,
    }
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    setContentMap(prev => ({
      ...prev,
      [editing]: { ...prev[editing], title: form.title_en, subtitle: form.subtitle_en, description: form.description_en, published: form.published, page: editing, images: prev[editing]?.images || [] }
    }))
    setEditing(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">{d.heading}</h1>
      </div>

      <div className="grid gap-6">
        {pages.map(page => {
          const c = contentMap[page]
          return (
            <div key={page} className="bg-card border border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-serif text-xl capitalize mb-1">{page}</h2>
                  <p className="text-sm text-muted-foreground">{c?.title || d.noTitle}</p>
                </div>
                <button type="button" onClick={() => editPage(page)} className="p-2 hover:bg-secondary transition-colors"><Pencil className="w-4 h-4" /></button>
              </div>
              {editing === page ? (
                <div className="space-y-6 mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-3 gap-4">
                    {langs.map(lang => (
                      <div key={lang}>
                        <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">{d.form.title} ({lang.toUpperCase()})</label>
                        <input type="text" value={form[`title_${lang}` as keyof typeof form] as string} onChange={e => setForm(prev => ({ ...prev, [`title_${lang}`]: e.target.value }))} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {langs.map(lang => (
                      <div key={lang}>
                        <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">{d.form.subtitle} ({lang.toUpperCase()})</label>
                        <input type="text" value={form[`subtitle_${lang}` as keyof typeof form] as string} onChange={e => setForm(prev => ({ ...prev, [`subtitle_${lang}`]: e.target.value }))} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {langs.map(lang => (
                      <div key={lang}>
                        <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">{d.form.description} ({lang.toUpperCase()})</label>
                        <textarea value={form[`description_${lang}` as keyof typeof form] as string} onChange={e => setForm(prev => ({ ...prev, [`description_${lang}`]: e.target.value }))} rows={4} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="published" checked={form.published} onChange={e => setForm(prev => ({ ...prev, published: e.target.checked }))} className="w-4 h-4 accent-accent" />
                    <label htmlFor="published" className="text-sm">{d.form.published}</label>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={save} className="bg-primary text-primary-foreground px-6 py-2 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors">{d.form.save}</button>
                    <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 text-sm tracking-wider uppercase hover:bg-secondary transition-colors">{d.form.cancel}</button>
                  </div>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
