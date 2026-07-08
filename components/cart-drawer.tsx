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
        className={`fixed top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col ${isRtl ? "left-0 border-r border-border/60" : "right-0 border-l border-border/60"}`}
        style={{ animation: `${isRtl ? "slideInRtl" : "slideInLtr"} 0.3s ease-out` }}
      >
        <style>{`
          @keyframes slideInLtr { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes slideInRtl { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        `}</style>

        <div className="flex items-center justify-between px-5 h-14 shrink-0 border-b border-border">
          <h2 className="font-serif text-lg">
            {t.header.cart} <span className="text-muted-foreground text-sm font-sans ml-1">({totalItems})</span>
          </h2>
          <button onClick={closeCart} className="w-8 h-8 flex items-center justify-center hover:bg-secondary/30 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full px-6">
              <p className="text-sm text-muted-foreground text-center">{t.header.cartEmpty}</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className={`flex gap-3 bg-secondary/10 border border-border/80 p-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                  <div className="w-20 h-24 bg-secondary/10 shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-snug">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wider">{catKey(item.category)}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="w-6 h-6 flex items-center justify-center hover:bg-secondary/40 transition-colors shrink-0" aria-label="Remove">
                        <X className="w-3.5 h-3.5 text-muted-foreground/60" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border/60">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-secondary/30 transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 h-7 flex items-center justify-center text-xs tabular-nums border-x border-border/60">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-secondary/30 transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm font-serif font-medium">{(item.price * item.quantity).toLocaleString()} <span className="text-xs text-muted-foreground font-sans">{t.products.currency}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-border px-5 py-4 shrink-0">
          {items.length === 0 ? (
            <Link
              href="/products"
              onClick={closeCart}
              className="flex items-center justify-center w-full bg-primary text-primary-foreground h-11 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors"
            >
              {t.checkout.browseProducts}
            </Link>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground font-medium">{t.checkout.total}</span>
                <span className="font-serif text-lg font-medium">{totalPrice.toLocaleString()} <span className="text-sm text-muted-foreground font-sans">{t.products.currency}</span></span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex items-center justify-center w-full bg-primary text-primary-foreground h-11 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors"
              >
                {t.checkout.proceed}
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}
