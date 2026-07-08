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
        className={`fixed top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col ${isRtl ? "left-0" : "right-0"}`}
        style={{ animation: `${isRtl ? "slideInRtl" : "slideInLtr"} 0.35s cubic-bezier(0.16, 1, 0.3, 1)` }}
      >
        <style>{`
          @keyframes slideInLtr { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes slideInRtl { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        `}</style>

        <div className="flex items-center justify-between px-8 h-16 border-b border-border/60">
          <h2 className="font-serif text-xl tracking-tight">
            {t.header.cart}
            <span className="text-muted-foreground text-sm font-sans ml-2">{totalItems}</span>
          </h2>
          <button onClick={closeCart} className="w-8 h-8 flex items-center justify-center hover:bg-secondary/40 transition-colors" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-10 text-center">
              <div className="w-16 h-px bg-border mb-8" />
              <p className="font-serif text-lg text-foreground/80">{t.header.cartEmpty}</p>
              <p className="text-xs text-muted-foreground mt-3 max-w-[220px] leading-relaxed">
                {lang === "ar" ? "أضف قطعاً إلى سلّتك لتبدأ تجربة التسوق" : lang === "fr" ? "Ajoutez des pièces à votre panier pour commencer" : "Add pieces to your cart to begin your shopping experience"}
              </p>
              <button onClick={closeCart} className="mt-8 text-[11px] tracking-[0.25em] uppercase border-b border-foreground/20 pb-1 text-foreground/60 hover:text-foreground hover:border-foreground/60 transition-all">
                {t.header.shop || "Continue Shopping"}
              </button>
              <div className="w-16 h-px bg-border mt-8" />
            </div>
          ) : (
            <div className="px-6 py-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className={`flex gap-5 ${isRtl ? "flex-row-reverse" : ""}`}>
                  <div className="w-[72px] h-[90px] bg-secondary/10 shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium leading-snug">{item.name}</h3>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-[0.2em]">{catKey(item.category)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-5 h-5 flex items-center justify-center hover:bg-secondary/40 transition-colors shrink-0 -mr-1"
                        aria-label="Remove item"
                      >
                        <X className="w-3 h-3 text-muted-foreground/60" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-3">
                      <div className="flex border border-border/60">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-secondary/30 transition-colors">
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-8 h-7 flex items-center justify-center text-xs tabular-nums border-x border-border/60">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-secondary/30 transition-colors">
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <p className="text-sm font-serif">{(item.price * item.quantity).toLocaleString()} <span className="text-[10px] text-muted-foreground tracking-wider">{t.products.currency}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/60 px-8 py-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground tracking-wider uppercase text-[11px]">{t.checkout.total}</span>
              <span className="font-serif text-xl">{totalPrice.toLocaleString()} <span className="text-xs text-muted-foreground">{t.products.currency}</span></span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center w-full bg-primary text-primary-foreground h-12 text-xs tracking-[0.25em] uppercase hover:bg-primary/90 transition-colors"
            >
              {t.checkout.heading || "Checkout"}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
