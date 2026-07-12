"use client"

import { useState } from "react"
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export default function AppointmentPage() {
  const { t } = useI18n()
  const a = t.appointmentPage
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", service: "", notes: "" })
  const [sent, setSent] = useState(false)
  const services = a.services as string[]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setSent(true)
      setForm({ name: "", email: "", phone: "", date: "", service: "", notes: "" })
    }
  }

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.bookAppointment}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">{t.footer.bookAppointment}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{a.desc}</p>
          </div>

          {sent ? (
            <div className="text-center py-16">
              <CheckCircle className="w-16 h-16 mx-auto mb-6 text-accent" />
              <p className="text-2xl font-serif mb-2">{a.successTitle}</p>
              <p className="text-muted-foreground">{a.successDesc}</p>
              <button onClick={() => setSent(false)} className="mt-6 text-sm underline">{a.bookAnother}</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2"><User className="w-4 h-4 inline mr-1" />{a.nameLabel}</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-secondary/10 border border-border focus:border-accent outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm mb-2"><Mail className="w-4 h-4 inline mr-1" />{a.emailLabel}</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-secondary/10 border border-border focus:border-accent outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2"><Phone className="w-4 h-4 inline mr-1" />{a.phoneLabel}</label>
                <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 bg-secondary/10 border border-border focus:border-accent outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm mb-2"><Calendar className="w-4 h-4 inline mr-1" />{a.dateLabel}</label>
                <input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full px-4 py-3 bg-secondary/10 border border-border focus:border-accent outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm mb-2"><Clock className="w-4 h-4 inline mr-1" />{a.serviceLabel}</label>
                <select required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} className="w-full px-4 py-3 bg-secondary/10 border border-border focus:border-accent outline-none transition-colors">
                  <option value="">{a.selectService}</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2"><MessageSquare className="w-4 h-4 inline mr-1" />{a.notesLabel}</label>
                <textarea rows={4} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="w-full px-4 py-3 bg-secondary/10 border border-border focus:border-accent outline-none transition-colors resize-none" />
              </div>
              <button type="submit" className="w-full bg-accent text-accent-foreground py-3 tracking-wider uppercase text-sm hover:opacity-90 transition-opacity">{a.submit}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
