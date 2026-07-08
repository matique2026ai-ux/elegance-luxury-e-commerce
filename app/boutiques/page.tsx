"use client"

import { useState, useEffect } from "react"
import { MapPin, Phone, Clock } from "lucide-react"
import { Header } from "@/components/header"
import { useI18n } from "@/lib/i18n-context"

const boutiques = [
  { id: 1, city: "Paris", address: "24 Place Vendôme, 75001", phone: "+33 1 42 60 00 00", hours: "10h - 19h", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Boutique%20Paris-Ds9XeWSdUztVjHSz6JYUMoW4pz7kHM.png", flagship: true },
  { id: 2, city: "Monaco", address: "Avenue des Beaux-Arts, 98000", phone: "+377 93 30 00 00", hours: "10h - 18h", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Boutique%20Monaco-UMlZbOKxKTYVz5vcsOlhuEY6t3rJSU.png", flagship: false },
  { id: 3, city: "Milan", address: "Via Montenapoleone 8, 20121", phone: "+39 02 7600 0000", hours: "10h - 19h", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Boutique%20Milan-Uvge4HScV50lCdtXKDlrWW2bmwUi5M.png", flagship: false },
]

export default function BoutiquesPage() {
  const { t } = useI18n()
  const [content, setContent] = useState<{ title: string; subtitle: string; description: string; images: string[] } | null>(null)

  useEffect(() => {
    fetch("/api/content?page=boutiques").then(r => r.json()).then(setContent)
  }, [])

  return (
    <div className="min-h-screen pt-28">
      <Header />
      <div className="py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.boutiques.label}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">
              {content?.title || t.boutiques.title1}
              <span className="block italic">{t.boutiques.title2}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {content?.description || t.boutiques.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {boutiques.map(b => (
              <div key={b.id} className="group">
                <div className="aspect-[4/5] relative overflow-hidden mb-6 bg-secondary/20">
                  <img src={b.image} alt={b.city} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {b.flagship && (
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs px-3 py-1 tracking-wider uppercase">
                      {t.boutiques.flagship}
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl">{b.city}</h3>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{b.address}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{b.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{b.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
