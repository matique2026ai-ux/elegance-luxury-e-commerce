"use client";

import { Award, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export function Press() {
  const { t } = useI18n();

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="text-center mb-20 md:mb-28">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            {t.press.label}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight">
            {t.press.title1}<span className="italic text-accent"> {t.press.title2}</span>
          </h2>
        </div>

        <div className="space-y-16 lg:space-y-24">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {t.press.features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-8 lg:p-10 space-y-6"
                style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-serif text-xl md:text-2xl leading-snug italic">
                  &ldquo;{feature.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm tracking-[0.2em] uppercase">
                    {feature.publication}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {feature.year}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary text-primary-foreground p-12 lg:p-16" style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}>
            <div className="flex flex-col md:flex-row md:items-center gap-12">
              <div className="md:w-1/3">
                <Award className="w-12 h-12 text-accent mb-6" />
                <h3 className="font-serif text-3xl md:text-4xl mb-4">
                  {t.press.awardsTitle}
                </h3>
                <p className="text-primary-foreground/70 leading-relaxed">
                  {t.press.awardsDesc}
                </p>
              </div>
              <div className="md:w-2/3 space-y-6">
                {t.press.awards.map((award, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-6 border-b border-primary-foreground/20 last:border-0"
                  >
                    <div>
                      <p className="font-serif text-xl mb-1">{award.name}</p>
                      <p className="text-sm text-primary-foreground/60">
                        {award.org}
                      </p>
                    </div>
                    <p className="text-accent text-lg">{award.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-y border-border py-12">
            <p className="text-center text-sm tracking-[0.3em] uppercase text-muted-foreground mb-10">
              {t.press.featured}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20 opacity-40">
              <div className="font-serif text-2xl tracking-wider">VOGUE</div>
              <div className="font-serif text-2xl tracking-wider">ELLE</div>
              <div className="font-serif text-2xl tracking-wider">HARPER'S BAZAAR</div>
              <div className="font-serif text-2xl tracking-wider">FT</div>
              <div className="font-serif text-2xl tracking-wider">WSJ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
