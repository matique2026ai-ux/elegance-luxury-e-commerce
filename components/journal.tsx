"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

const articles = [
  {
    id: 1,
    title: "The Art of Leather: A Journey to the Heart of Our Atelier",
    category: "Craftsmanship",
    date: "Jan 15, 2026",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Atelier%20de%20Cuir-CqVgWtJir9DMfqI20dyiHs7hbTe2hG.png",
    excerpt:
      "Discover the secrets of our master artisans who have perpetuated unique expertise since 1847.",
  },
  {
    id: 2,
    title: "Spring Collection: The Colors of Renaissance",
    category: "Collections",
    date: "Jan 10, 2026",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Collection%20Printemps%20Renaissance-FCjMUb7yRDP99VcIUq2mBLbVOIwaob.png",
    excerpt:
      "This season, our creations are inspired by Florentine gardens and their delicate palette.",
  },
  {
    id: 3,
    title: "Meet Marie Deschamps, Our Creative Director",
    category: "Portraits",
    date: "Jan 5, 2026",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Portrait%20Directrice%20Cr_ative-1QPQ0NqF2EBtjhlFqoPIoynq4lN3SI.png",
    excerpt:
      "An exclusive interview about her vision for fashion and the future of the house.",
  },
];

export function Journal() {
  const { t } = useI18n();

  return (
    <section id="journal" className="py-24 md:py-32">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
              {t.journal.label}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight">
              {t.journal.title1}<span className="italic text-accent"> {t.journal.title2}</span>
            </h2>
          </div>
          <button
            type="button"
            className="group inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300 self-start md:self-auto"
          >
            {t.journal.cta}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          <article className="group cursor-pointer">
            <div className="relative overflow-hidden mb-6">
              <div className="aspect-[4/3] lg:aspect-[3/4]">
                <img
                  src={articles[0].image || "/placeholder.svg"}
                  alt={articles[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2">
                <p className="text-[10px] tracking-[0.2em] uppercase">
                  {articles[0].category}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">{articles[0].date}</p>
              <h3 className="font-serif text-2xl md:text-3xl group-hover:text-accent transition-colors duration-300 text-balance">
                {articles[0].title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {articles[0].excerpt}
              </p>
            </div>
          </article>

          <div className="flex flex-col gap-6 md:gap-8">
            {articles.slice(1).map((article) => (
              <article
                key={article.id}
                className="group cursor-pointer grid md:grid-cols-[1fr,1.5fr] gap-4 md:gap-6"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3]">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="space-y-2 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      {article.category}
                    </p>
                    <span className="w-px h-3 bg-border" />
                    <p className="text-sm text-muted-foreground">
                      {article.date}
                    </p>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl group-hover:text-accent transition-colors duration-300 text-balance">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
