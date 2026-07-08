"use client"

import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
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
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300" onClick={closeCart} />
      <div
        className={`fixed top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col ${isRtl ? "left-0" : "right-0"}`}
        style={{ animation: `${isRtl ? "slideInRtl" : "slideInLtr"} 0.3s ease-out` }}
      >
        <style>{`
          @keyframes slideInLtr { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes slideInRtl { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        `}</style>
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-serif text-lg">{t.header.cart} <span className="text-muted-foreground text-sm">({totalItems})</span></h2>
          <button onClick={closeCart} className="p-2 hover:bg-secondary/50 transition-colors rounded-sm">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="w-14 h-14 rounded-full bg-secondary/40 flex items-center justify-center mb-4">
                <ShoppingBag className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">{t.header.cartEmpty}</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {items.map((item) => (
                <div key={item.id} className={`flex gap-3 px-6 py-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                  <div className="w-16 h-20 bg-secondary/20 shrink-0 overflow-hidden rounded-sm">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium leading-tight">{item.name}</h3>
                        <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">{catKey(item.category)}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="p-1 hover:bg-destructive/10 hover:text-destructive transition-colors rounded-sm shrink-0">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-sm">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center hover:bg-secondary/50 transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center hover:bg-secondary/50 transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm font-serif font-medium">{(item.price * item.quantity).toLocaleString()} {t.products.currency}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t.checkout.total}</span>
              <span className="font-serif text-lg font-medium">{totalPrice.toLocaleString()} {t.products.currency}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-primary text-primary-foreground text-center py-3 text-sm tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
            >
              {t.checkout.heading || "Checkout"}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
