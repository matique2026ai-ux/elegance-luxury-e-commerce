"use client"

import { useState, useEffect } from "react"
import { Pencil } from "lucide-react"

interface PageContent {
  page: string
  title: string
  subtitle: string
  description: string
  images: string[]
  published: boolean
}

const pages = ["heritage", "services", "boutiques"]

export default function DashboardContent() {
  const [contentMap, setContentMap] = useState<Record<string, PageContent>>({})
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ title: "", subtitle: "", description: "", published: true })

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then((data: PageContent[]) => {
      const map: Record<string, PageContent> = {}
      data.forEach(c => { map[c.page] = c })
      setContentMap(map)
    })
  }, [])

  function editPage(page: string) {
    const c = contentMap[page]
    setForm({ title: c?.title || "", subtitle: c?.subtitle || "", description: c?.description || "", published: c?.published ?? true })
    setEditing(page)
  }

  async function save() {
    if (!editing) return
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: editing, ...form }),
    })
    setContentMap(prev => ({ ...prev, [editing]: { ...prev[editing], ...form, page: editing, images: prev[editing]?.images || [] } }))
    setEditing(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">Content Management</h1>
      </div>

      <div className="grid gap-6">
        {pages.map(page => {
          const c = contentMap[page]
          return (
            <div key={page} className="bg-card border border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-serif text-xl capitalize mb-1">{page}</h2>
                  <p className="text-sm text-muted-foreground">{c?.title || "No title set"}</p>
                </div>
                <button type="button" onClick={() => editPage(page)} className="p-2 hover:bg-secondary transition-colors"><Pencil className="w-4 h-4" /></button>
              </div>
              {editing === page ? (
                <div className="space-y-4 mt-4 pt-4 border-t border-border">
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">Title</label>
                    <input type="text" value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">Subtitle</label>
                    <input type="text" value={form.subtitle} onChange={e => setForm(prev => ({ ...prev, subtitle: e.target.value }))} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1">Description</label>
                    <textarea value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} rows={4} className="w-full bg-secondary/50 border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent" />
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="published" checked={form.published} onChange={e => setForm(prev => ({ ...prev, published: e.target.checked }))} className="w-4 h-4 accent-accent" />
                    <label htmlFor="published" className="text-sm">Published</label>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={save} className="bg-primary text-primary-foreground px-6 py-2 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors">Save</button>
                    <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 text-sm tracking-wider uppercase hover:bg-secondary transition-colors">Cancel</button>
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
