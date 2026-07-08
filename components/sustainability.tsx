"use client";

import { Leaf, Heart, Shield, Recycle, type LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

const icons: LucideIcon[] = [Leaf, Heart, Shield, Recycle];

export function Sustainability() {
  const { t } = useI18n();

  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start space-y-8">
            <div className="space-y-4">
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
                {t.sustainability.label}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
                {t.sustainability.title1}
                <span className="block italic text-accent">{t.sustainability.title2}</span>
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.sustainability.desc}
            </p>

            <div className="pt-4">
              <div className="inline-block p-6 space-y-2 bg-white" style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}>
                <p className="font-serif text-3xl text-accent">100%</p>
                <p className="text-sm text-muted-foreground">
                  {t.sustainability.carbon}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center border border-primary text-primary px-8 py-4 text-sm tracking-[0.2em] uppercase min-h-12 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              {t.sustainability.cta}
            </button>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6 lg:gap-8">
            {t.sustainability.items.map((item, index) => {
              const Icon = icons[index];
              return (
                <div
                  key={index}
                  className="bg-card p-8 lg:p-10 space-y-6 hover:shadow-lg transition-shadow duration-300"
                  style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}
                >
                  <Icon className="w-10 h-10 text-accent" />
                  <h3 className="font-serif text-2xl">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
