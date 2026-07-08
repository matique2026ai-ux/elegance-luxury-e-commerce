"use client"

import { X, Minus, Plus } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useI18n } from "@/lib/i18n-context"

export function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, totalPrice, removeItem, updateQuantity } = useCart()
  const { t, lang } = useI18n()

  if (!isOpen) return null

  const isRtl = lang === "ar"

  const catKey = (cat: string): string => {
    const map: Record<string, string> = {
      men: t.products.categories.men,
      women: t.products.categories.women,
      children: t.products.categories.children,
    }
    return map[cat] || cat
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-300" onClick={closeCart} />
      <div
        className={`fixed top-0 h-full w-full max-w-[420px] bg-background z-50 shadow-2xl flex flex-col ${isRtl ? "left-0" : "right-0"}`}
        style={{ animation: `${isRtl ? "slideInRtl" : "slideInLtr"} 0.35s cubic-bezier(0.16, 1, 0.3, 1)` }}
      >
        <style>{`
          @keyframes slideInLtr { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes slideInRtl { from { transform: translateX(-100%); } to { transform: translateX(0); } }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <div className="flex items-center justify-between px-8 h-16 shrink-0 border-b border-border/40">
          <h2 className="font-serif text-xl tracking-tight">
            {t.header.cart}
            <span className="text-muted-foreground text-sm font-sans ml-2">{totalItems}</span>
          </h2>
          <button onClick={closeCart} className="w-8 h-8 flex items-center justify-center hover:bg-secondary/30 transition-colors" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-12 text-center">
              <div className="w-12 h-px bg-border/60 mb-8" />
              <p className="font-serif text-base text-foreground/70 leading-relaxed">{t.header.cartEmpty}</p>
              <button onClick={closeCart} className="mt-8 text-[11px] tracking-[0.25em] uppercase border-b border-foreground/10 pb-1 text-foreground/40 hover:text-foreground/70 hover:border-foreground/30 transition-all">
                {lang === "ar" ? "مواصلة التسوق" : lang === "fr" ? "Continuer mes achats" : "Continue Shopping"}
              </button>
              <div className="w-12 h-px bg-border/60 mt-8" />
            </div>
          ) : (
            <div className="px-8 py-6 space-y-5">
              {items.map((item) => (
                <div key={item.id} className={`flex gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                  <div className="w-[68px] h-[85px] bg-secondary/10 shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium leading-snug text-foreground/90">{item.name}</h3>
                        <p className="text-[10px] text-muted-foreground/70 mt-1 uppercase tracking-[0.15em]">{catKey(item.category)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-5 h-5 flex items-center justify-center hover:bg-secondary/30 transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <X className="w-3 h-3 text-muted-foreground/40" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex border border-border/50">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-secondary/20 transition-colors">
                          <Minus className="w-2.5 h-2.5 text-foreground/60" />
                        </button>
                        <span className="w-8 h-7 flex items-center justify-center text-xs tabular-nums border-x border-border/50 text-foreground/80">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-secondary/20 transition-colors">
                          <Plus className="w-2.5 h-2.5 text-foreground/60" />
                        </button>
                      </div>
                      <p className="text-sm font-serif text-foreground/90">{(item.price * item.quantity).toLocaleString()} <span className="text-[10px] text-muted-foreground/60">{t.products.currency}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/40 px-8 py-5 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground/70 tracking-[0.15em] uppercase">{t.checkout.total}</span>
              <span className="font-serif text-lg">{totalPrice.toLocaleString()} <span className="text-xs text-muted-foreground/60">{t.products.currency}</span></span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center w-full bg-primary text-primary-foreground h-11 text-xs tracking-[0.25em] uppercase hover:bg-primary/90 transition-colors"
            >
              {t.checkout.heading || "Checkout"}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
