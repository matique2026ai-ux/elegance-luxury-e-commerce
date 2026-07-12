"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, ArrowLeft } from "lucide-react"

const boutiques = [
  { id: 1, city: "Paris", address: "24 Place Vendôme, 75001", phone: "+33 1 42 60 00 00", hours: "10h - 19h", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Boutique%20Paris-Ds9XeWSdUztVjHSz6JYUMoW4pz7kHM.png", flagship: true },
  { id: 2, city: "Monaco", address: "Avenue des Beaux-Arts, 98000", phone: "+377 93 30 00 00", hours: "10h - 18h", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Boutique%20Monaco-UMlZbOKxKTYVz5vcsOlhuEY6t3rJSU.png", flagship: false },
  { id: 3, city: "Milan", address: "Via Montenapoleone 8, 20121", phone: "+39 02 7600 0000", hours: "10h - 19h", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Boutique%20Milan-Uvge4HScV50lCdtXKDlrWW2bmwUi5M.png", flagship: false },
]

interface Props {
  translations: {
    label: string
    title1: string
    title2: string
    desc: string
    flagship: string
  }
  content: { title?: string; description?: string } | null
}

export default function BoutiquesClient({ translations: t, content }: Props) {
  const [selected, setSelected] = useState<number | null>(null)

  const selectedBoutique = boutiques.find(b => b.id === selected)

  if (selectedBoutique) {
    return (
      <div className="min-h-screen pt-28">
        <div className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span className="tracking-wider uppercase">{t.label}</span>
            </button>
            <div className="aspect-[4/5] relative overflow-hidden mb-8 bg-secondary/20">
              <img src={selectedBoutique.image} alt={selectedBoutique.city} className="w-full h-full object-cover" />
              {selectedBoutique.flagship && (
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs px-3 py-1 tracking-wider uppercase">{t.flagship}</div>
              )}
            </div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">{selectedBoutique.city}</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-foreground" />
                <span className="text-lg">{selectedBoutique.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 shrink-0 text-foreground" />
                <span className="text-lg">{selectedBoutique.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 shrink-0 text-foreground" />
                <span className="text-lg">{selectedBoutique.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.label}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">
              {content?.title || t.title1}
              <span className="block italic">{t.title2}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {content?.description || t.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {boutiques.map(b => (
              <button key={b.id} onClick={() => setSelected(b.id)} className="text-left group cursor-pointer">
                <div className="aspect-[4/5] relative overflow-hidden mb-6 bg-secondary/20">
                  <img src={b.image} alt={b.city} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {b.flagship && (
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs px-3 py-1 tracking-wider uppercase">
                      {t.flagship}
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
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
