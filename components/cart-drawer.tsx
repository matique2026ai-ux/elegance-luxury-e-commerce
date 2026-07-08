"use client"

import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useI18n } from "@/lib/i18n-context"

export function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, totalPrice, removeItem, updateQuantity } = useCart()
  const { t } = useI18n()

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300" onClick={closeCart} />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col" style={{ animation: "slideIn 0.3s ease-out" }}>
        <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-serif text-xl">{t.header.cart} <span className="text-muted-foreground text-base">({totalItems})</span></h2>
          <button onClick={closeCart} className="p-2 hover:bg-secondary transition-colors rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">{t.header.cartEmpty}</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-card border border-border p-3 rounded-sm">
                <div className="w-20 h-24 bg-secondary/20 shrink-0 overflow-hidden rounded-sm">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-medium truncate">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="p-1 -mr-1 -mt-1 hover:bg-destructive/10 hover:text-destructive transition-colors rounded">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wider">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 border border-border rounded-sm">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-secondary transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-secondary transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-sm font-serif">{(item.price * item.quantity).toLocaleString()} {t.products.currency}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t.checkout.total}</span>
              <span className="font-serif text-xl">{totalPrice.toLocaleString()} {t.products.currency}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-primary text-primary-foreground text-center py-3.5 text-sm tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
            >
              {t.checkout.heading || "Checkout"}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
