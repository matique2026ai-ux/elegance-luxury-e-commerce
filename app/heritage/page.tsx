import { Play } from "lucide-react"
import { getPageData } from "@/lib/server-i18n"

export default async function HeritagePage() {
  const { t, content } = await getPageData('heritage')

  return (
    <div className="min-h-screen pt-28">
      <div className="bg-primary text-primary-foreground py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8 lg:pr-12">
              <div className="space-y-4">
                <p className="text-sm tracking-[0.3em] uppercase text-primary-foreground/60">{t.heritage.label}</p>
                <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.1]">
                  {content?.title || t.heritage.title1}
                  <span className="block italic text-accent">{t.heritage.title2}</span>
                  {t.heritage.title3}
                </h1>
              </div>
              <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-lg">
                {content?.description || t.heritage.desc}
              </p>
              <div className="grid grid-cols-3 gap-8 py-8 border-y border-primary-foreground/20">
                <div>
                  <p className="font-serif text-4xl md:text-5xl text-accent">178</p>
                  <p className="text-sm text-primary-foreground/60 mt-1">{t.heritage.years}</p>
                </div>
                <div>
                  <p className="font-serif text-4xl md:text-5xl text-accent">47</p>
                  <p className="text-sm text-primary-foreground/60 mt-1">{t.heritage.artisans}</p>
                </div>
                <div>
                  <p className="font-serif text-4xl md:text-5xl text-accent">12k</p>
                  <p className="text-sm text-primary-foreground/60 mt-1">{t.heritage.unique}</p>
                </div>
              </div>
              <button className="flex items-center gap-3 group">
                <span className="w-14 h-14 rounded-full border border-primary-foreground/30 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </span>
                <span className="text-sm tracking-wider uppercase">{t.heritage.cta}</span>
              </button>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={content?.images?.[0] || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%282%29-qsHmoJIZtkh9Zw7PIDspOZVh50aE2F.png"} alt="Heritage" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
