"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

const boutiques = [
  {
    id: 1,
    city: "Paris",
    address: "24 Place Vendôme, 75001",
    phone: "+33 1 42 60 00 00",
    hours: "10h - 19h",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Boutique%20Paris-Ds9XeWSdUztVjHSz6JYUMoW4pz7kHM.png",
    flagship: true,
  },
  {
    id: 2,
    city: "Monaco",
    address: "Avenue des Beaux-Arts, 98000",
    phone: "+377 93 30 00 00",
    hours: "10h - 18h",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Boutique%20Monaco-UMlZbOKxKTYVz5vcsOlhuEY6t3rJSU.png",
    flagship: false,
  },
  {
    id: 3,
    city: "Milan",
    address: "Via Montenapoleone 8, 20121",
    phone: "+39 02 7600 0000",
    hours: "10h - 19h",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Boutique%20Milan-Uvge4HScV50lCdtXKDlrWW2bmwUi5M.png",
    flagship: false,
  },
];

export function Boutiques() {
  const { t } = useI18n();

  return (
    <section id="boutiques" className="py-24 md:py-32">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            {t.boutiques.label}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            {t.boutiques.title1}
            <span className="italic text-accent"> {t.boutiques.title2}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t.boutiques.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {boutiques.map((boutique) => (
            <div
              key={boutique.id}
              className={`group relative ${boutique.flagship ? "md:col-span-1" : ""}`}
            >
              <div className="relative overflow-hidden mb-6">
                <div className="aspect-[3/2]">
                  <img
                    src={boutique.image || "/placeholder.svg"}
                    alt={`Boutique ${boutique.city}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {boutique.flagship && (
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2">
                    <p className="text-[10px] tracking-[0.2em] uppercase">
                      {t.boutiques.flagship}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl md:text-3xl">
                  {boutique.city}
                </h3>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{boutique.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{boutique.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{boutique.hours}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center text-sm tracking-[0.15em] uppercase hover:text-accent transition-colors duration-300 pt-2"
                >
                  {t.boutiques.book}
                  <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
