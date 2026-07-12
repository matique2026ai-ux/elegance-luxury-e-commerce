"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export default function ContactPage() {
  const { t } = useI18n()
  const c = t.contactPage
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setSent(true)
      setForm({ name: "", email: "", message: "" })
    }
  }

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.contact}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{t.footer.contact}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.services.desc}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-8">
              <h2 className="font-serif text-2xl">{t.services.concierge}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 mt-0.5 text-accent shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{c.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 mt-0.5 text-accent shrink-0" />
                  <div>
                    <p className="font-medium">{t.footer.contact}</p>
                    <p className="text-sm text-muted-foreground">{c.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-0.5 text-accent shrink-0" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-sm text-muted-foreground">{c.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 mt-0.5 text-accent shrink-0" />
                  <div>
                    <p className="font-medium">Horaires</p>
                    <p className="text-sm text-muted-foreground">{c.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {sent ? (
                <div className="bg-secondary/20 p-8 text-center rounded">
                  <p className="text-lg font-medium">{c.successTitle}</p>
                  <p className="text-sm text-muted-foreground mt-2">{c.successDesc}</p>
                  <button onClick={() => setSent(false)} className="mt-4 text-sm underline">{c.sendAnother}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2">{c.formName}</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-secondary/10 border border-border focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">{c.formEmail}</label>
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-secondary/10 border border-border focus:border-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">{c.formMessage}</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 bg-secondary/10 border border-border focus:border-accent outline-none transition-colors resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-accent text-accent-foreground py-3 tracking-wider uppercase text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <Send className="w-4 h-4" />
                    {c.send}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
