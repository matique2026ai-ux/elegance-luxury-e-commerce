"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n-context";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen">
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-[120%] object-cover"
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-jYfS4M6jRWnwCXxBXYxycBc7Ke4IOr.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
      </div>

      <div className="absolute inset-0 hidden lg:flex justify-between px-12 pointer-events-none">
        <div className="w-px h-full bg-white/[0.06]" />
        <div className="w-px h-full bg-white/[0.06]" />
        <div className="w-px h-full bg-white/[0.06]" />
        <div className="w-px h-full bg-white/[0.06]" />
        <div className="w-px h-full bg-white/[0.06]" />
      </div>

      <div
        className="absolute left-12 top-0 w-px bg-[#c9a962]/40 hidden lg:block animate-in slide-in-from-top duration-1000"
        style={{
          height: "40%",
          animationDelay: "1200ms",
          animationFillMode: "both",
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-center pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-8">
              <div
                className="flex items-center gap-4 animate-in fade-in slide-in-from-left-8 duration-700"
                style={{ animationDelay: "300ms", animationFillMode: "both" }}
              >
                <div className="w-12 h-px bg-[#c9a962]" />
                <p className="text-sm tracking-[0.4em] uppercase text-white/60">
                  {t.hero.season}
                </p>
              </div>

              <h1
                className={`${isAr ? "font-arabic" : "font-serif"} text-4xl md:text-5xl lg:text-6xl xl:text-[6rem] ${isAr ? "leading-[1.2]" : "leading-[0.88]"} tracking-tight text-white animate-in fade-in slide-in-from-bottom-8 duration-1000`}
                style={{ animationDelay: "500ms", animationFillMode: "both" }}
              >
                {t.hero.title1}
                {isAr ? " " : <br />}
                <span className={`text-[#c9a962] ${isAr ? "" : "italic"}`}>
                  {t.hero.title2}
                </span>{" "}
                {t.hero.title3}
              </h1>

              <p
                className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: "800ms", animationFillMode: "both" }}
              >
                {t.hero.subtitle}
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: "1000ms", animationFillMode: "both" }}
              >
                <button
                  type="button"
                  className="group inline-flex items-center justify-center gap-3 bg-white text-[#1a1a1a] px-10 py-5 text-sm tracking-[0.25em] uppercase min-h-12 hover:bg-[#c9a962] hover:text-[#1a1a1a] transition-all duration-500"
                >
                  {t.hero.cta1}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-5 text-sm tracking-[0.25em] uppercase min-h-12 hover:border-white hover:bg-white/10 transition-all duration-500 backdrop-blur-sm"
                >
                  {t.hero.cta2}
                </button>
              </div>
            </div>

            <div
              className="lg:col-span-4 hidden lg:flex flex-col items-end gap-8 animate-in fade-in slide-in-from-right-8 duration-700"
              style={{ animationDelay: "1100ms", animationFillMode: "both" }}
            >
              <div
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 max-w-[280px] w-full"
                style={{
                  boxShadow:
                    "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
                }}
              >
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-4">
                  {t.hero.heritageLabel}
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="font-serif text-4xl text-[#c9a962]">1847</p>
                    <p className="text-sm text-white/50 mt-1">
                      {t.hero.yearLabel}
                    </p>
                  </div>
                  <div className="w-full h-px bg-white/10" />
                  <div>
                    <p className="font-serif text-4xl text-[#c9a962]">47</p>
                    <p className="text-sm text-white/50 mt-1">
                      {t.hero.artisansLabel}
                    </p>
                  </div>
                  <div className="w-full h-px bg-white/10" />
                  <div>
                    <p className="font-serif text-4xl text-[#c9a962]">12k+</p>
                    <p className="text-sm text-white/50 mt-1">
                      {t.hero.piecesLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a962]/30 to-transparent" />
    </section>
  );
}
