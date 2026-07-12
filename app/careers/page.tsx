"use client"

import { useI18n } from "@/lib/i18n-context"
import { Briefcase, Users, GraduationCap, Heart, Globe, ArrowRight } from "lucide-react"

const jobs = [
  { title: "Maître Artisan Maroquinier", type: "CDI", location: "Paris", desc: "Rejoignez notre atelier pour perpétuer un savoir-faire d'exception. Maîtrise des techniques de maroquinerie traditionnelle requise." },
  { title: "Conseiller Clientèle", type: "CDI", location: "Paris / Monaco", desc: "Offrez une expérience sur mesure à notre clientèle exigeante. Esprit de service et sens du détail." },
  { title: "Designer Haute Couture", type: "CDI", location: "Paris", desc: "Participez à la création de nos collections. Créativité, excellence et connaissance du luxe." },
  { title: "Responsable Marketing Digital", type: "CDI", location: "Paris", desc: "Développez notre présence digitale et nos stratégies d'acquisition pour une marque de luxe." },
]

const benefits = [
  { icon: Heart, title: "Cadre d'Exception", desc: "Un environnement de travail inspirant au cœur de Paris" },
  { icon: Users, title: "Formation Continue", desc: "Programmes de développement et mentorat par nos maîtres artisans" },
  { icon: GraduationCap, title: "Avantages Sociaux", desc: "Mutuelle premium, intéressement et participation" },
  { icon: Globe, title: "Mobilité Internationale", desc: "Opportunités dans nos boutiques à travers le monde" },
]

export default function CareersPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-28">
      <div className="py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">{t.footer.careers}</p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">Carrières</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Rejoignez une maison d&apos;exception où le savoir-faire et la passion rencontrent l&apos;excellence.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <div key={i} className="flex gap-4 p-6 border border-border">
                  <Icon className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">{b.title}</h3>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl mb-8 text-center">Offres d&apos;Emploi</h2>
            <div className="space-y-4">
              {jobs.map((job, i) => (
                <div key={i} className="p-6 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-secondary/10 transition-colors">
                  <div className="space-y-1">
                    <h3 className="font-medium">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.type}</span>
                      <span>{job.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{job.desc}</p>
                  </div>
                  <button className="whitespace-nowrap px-6 py-2 border border-accent text-accent text-sm tracking-wider uppercase hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2">
                    Postuler <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">Aucune offre ne correspond à votre profil ? Envoyez-nous votre candidature spontanée à talents@herahima.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
