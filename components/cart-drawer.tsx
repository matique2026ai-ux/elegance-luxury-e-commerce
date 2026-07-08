"use client"

import { X, Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useI18n } from "@/lib/i18n-context"

export function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, totalPrice, removeItem, updateQuantity } = useCart()
  const { t } = useI18n()

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={closeCart} />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-serif text-xl">{t.header.cart} ({totalItems})</h2>
          <button onClick={closeCart} className="p-2 hover:bg-secondary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">{t.header.cartEmpty}</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-card border border-border p-4">
                <div className="w-20 h-24 bg-secondary/20 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
                  <p className="text-sm font-medium mt-1">{(item.price * item.quantity).toLocaleString()} {t.products.currency}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center border border-border hover:bg-secondary transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center border border-border hover:bg-secondary transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                    <button onClick={() => removeItem(item.id)} className="ml-auto p-1.5 hover:bg-destructive/10 hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium">{t.checkout.total}</span>
              <span className="font-serif">{totalPrice.toLocaleString()} {t.products.currency}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-primary text-primary-foreground text-center py-3 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors"
            >
              {t.featured.add}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
