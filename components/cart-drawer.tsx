"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useI18n } from "@/lib/i18n-context"
import { useEffect, useRef } from "react"

export function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, totalPrice, removeItem, updateQuantity } = useCart()
  const { t, lang } = useI18n()
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart() }
    window.addEventListener("keydown", handler)
    drawerRef.current?.focus()
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, closeCart])

  if (!isOpen) return null

  const rmLabel = lang === "ar" ? "إزالة" : lang === "fr" ? "Retirer" : "Remove"

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", justifyContent: lang === "ar" ? "flex-start" : "flex-end" }}>
      <div onClick={closeCart} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
      <div
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={t.header.cart}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "420px",
          height: "100vh",
          background: "#f7f5f0",
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
          boxShadow: lang === "ar" ? "4px 0 20px rgba(0,0,0,0.15)" : "-4px 0 20px rgba(0,0,0,0.15)",
          animation: `${lang === "ar" ? "slideInRtl" : "slideInLtr"} 0.3s ease-out`,
        }}
      >
        <style>{`
          @keyframes slideInLtr { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes slideInRtl { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        `}</style>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #d4d0c8" }}>
          <span style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "18px" }}>
            {t.header.cart} <span style={{ color: "#8a8678", fontSize: "14px", fontFamily: "var(--font-sans, sans-serif)" }}>({totalItems})</span>
          </span>
          <button onClick={closeCart} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer" }}>
            <X style={{ width: 16, height: 16 }} />
          </button>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
          {items.length === 0 ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <p style={{ fontSize: "14px", color: "#8a8678", textAlign: "center" }}>{t.header.cartEmpty}</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "12px",
                    background: "#ffffff",
                    border: "1px solid #d4d0c8",
                    borderRadius: "4px",
                    padding: "12px",
                  }}
                >
                  <div style={{ width: 80, height: 96, background: "#ece9e3", flexShrink: 0, overflow: "hidden", borderRadius: "2px" }}>
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a", margin: 0, lineHeight: 1.3 }}>{item.name}</p>
                        <p style={{ fontSize: "11px", color: "#8a8678", margin: "2px 0 0 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", flexShrink: 0 }}
                        aria-label={rmLabel}
                      >
                        <X style={{ width: 12, height: 12, color: "#8a8678" }} />
                      </button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid #d4d0c8" }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", borderRight: "1px solid #d4d0c8", fontSize: "14px", color: "#1a1a1a" }}
                        >
                          −
                        </button>
                        <span style={{ width: 32, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#1a1a1a" }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", borderLeft: "1px solid #d4d0c8", fontSize: "14px", color: "#1a1a1a" }}
                        >
                          +
                        </button>
                      </div>
                      <span style={{ fontSize: "14px", fontFamily: "var(--font-serif, Georgia, serif)", fontWeight: 500, color: "#1a1a1a" }}>
                        {(item.price * item.quantity).toLocaleString()} <span style={{ fontSize: "12px", color: "#8a8678", fontFamily: "var(--font-sans, sans-serif)" }}>{t.products.currency}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div style={{ borderTop: "1px solid #d4d0c8", padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", color: "#8a8678" }}>{t.checkout.total}</span>
              <span style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "18px", fontWeight: 500, color: "#1a1a1a" }}>
                {totalPrice.toLocaleString()} <span style={{ fontSize: "13px", color: "#8a8678", fontFamily: "var(--font-sans, sans-serif)" }}>{t.products.currency}</span>
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              style={{ display: "block", textAlign: "center", width: "100%", background: "#1a1a1a", color: "#f7f5f0", padding: "12px 0", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}
            >
              {t.checkout.proceed}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
