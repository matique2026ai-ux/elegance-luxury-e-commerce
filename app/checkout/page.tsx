"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { wilayas } from "@/lib/wilayas"
import { useI18n } from "@/lib/i18n-context"
import { useCart } from "@/context/cart-context"
import { ArrowRight, MapPin, Phone, User, Home } from "lucide-react"

export default function CheckoutPage() {
  const { t } = useI18n()
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [step, setStep] = useState<"shipping" | "review" | "done">("shipping")
  const c = t.checkout

  const [form, setForm] = useState({
    name: "", phone: "", wilayaCode: "", commune: "", address: "",
  })
  const [shippingPrice, setShippingPrice] = useState(0)
  const [wilayaSelected, setWilayaSelected] = useState(false)

  useEffect(() => {
    const w = wilayas.find(x => x.code === Number(form.wilayaCode))
    if (w) { setShippingPrice(w.shippingPrice); setWilayaSelected(true) }
  }, [form.wilayaCode])

  const grandTotal = totalPrice + shippingPrice

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const w = wilayas.find(x => x.code === Number(form.wilayaCode))
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, category: i.category })),
        total: totalPrice,
        shippingPrice,
        grandTotal,
        customer: { ...form, wilaya: w?.nameEn || form.wilayaCode },
      }),
    })
    if (res.ok) {
      clearCart()
      setStep("done")
    }
  }

  if (items.length === 0 && step !== "done") {
    return (
      <main className="min-h-screen">
        <div className="pt-32 pb-16 text-center">
          <h1 className="font-serif text-3xl mb-4">{c.emptyCart}</h1>
          <button onClick={() => router.push("/products")} className="border border-primary text-primary px-8 py-3 text-sm tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all">
            {c.browseProducts}
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <div className="pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          {step === "done" ? (
            <div className="text-center py-16 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-accent/20 flex items-center justify-center mx-auto mb-8">
                <span className="text-4xl text-accent">✓</span>
              </div>
              <h1 className="font-serif text-4xl mb-4">{c.thankYou}</h1>
              <p className="text-muted-foreground mb-8">{c.thankYouMsg}</p>
              <button onClick={() => router.push("/")} className="bg-primary text-primary-foreground px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-primary/90 transition-all">
                {c.backToHome}
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <div className="bg-card border border-border p-6 lg:p-8 sticky top-32">
                  <h2 className="font-serif text-2xl mb-6">{c.orderSummary}</h2>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-muted-foreground text-xs">{c.form.qty}: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{(item.price * item.quantity).toLocaleString()} {t.products.currency}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{c.subtotal}</span>
                      <span>{totalPrice.toLocaleString()} {t.products.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{c.shipping}</span>
                      <span>{wilayaSelected ? `${shippingPrice.toLocaleString()} ${t.products.currency}` : "—"}</span>
                    </div>
                    <div className="flex justify-between font-serif text-xl pt-2 border-t border-border">
                      <span>{c.total}</span>
                      <span className="text-accent">{wilayaSelected ? `${grandTotal.toLocaleString()} ${t.products.currency}` : `${totalPrice.toLocaleString()} ${t.products.currency} + ${c.shipping}`}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 order-1 lg:order-2">
                <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-8">{c.heading}</h1>
                <p className="text-muted-foreground mb-8">{c.subtitle}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm tracking-[0.1em] uppercase text-muted-foreground mb-2">{c.form.fullName}</label>
                      <div className="flex border border-border">
                        <span className="flex items-center px-4 bg-secondary/50 border-r border-border"><User className="w-4 h-4 text-muted-foreground" /></span>
                        <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm" placeholder="Mohamed Ahmed" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm tracking-[0.1em] uppercase text-muted-foreground mb-2">{c.form.phone}</label>
                      <div className="flex border border-border">
                        <span className="flex items-center px-4 bg-secondary/50 border-r border-border"><Phone className="w-4 h-4 text-muted-foreground" /></span>
                        <input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm" placeholder="0555 12 34 56" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm tracking-[0.1em] uppercase text-muted-foreground mb-2">{c.form.wilaya}</label>
                    <div className="flex border border-border">
                      <span className="flex items-center px-4 bg-secondary/50 border-r border-border"><MapPin className="w-4 h-4 text-muted-foreground" /></span>
                      <select value={form.wilayaCode} onChange={e => setForm({ ...form, wilayaCode: e.target.value })} className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm">
                        <option value="">{c.form.selectWilaya}</option>
                        {wilayas.map(w => (
                          <option key={w.code} value={w.code}>
                            {w.code} - {w.nameAr} / {w.nameFr} — {w.shippingPrice} {t.products.currency}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm tracking-[0.1em] uppercase text-muted-foreground mb-2">{c.form.commune}</label>
                      <input type="text" required value={form.commune} onChange={e => setForm({ ...form, commune: e.target.value })} className="w-full px-4 py-3 bg-transparent border border-border focus:outline-none text-sm" placeholder="Hydra, Kouba, ..." />
                    </div>
                    <div>
                      <label className="block text-sm tracking-[0.1em] uppercase text-muted-foreground mb-2">{c.form.address}</label>
                      <div className="flex border border-border">
                        <span className="flex items-center px-4 bg-secondary/50 border-r border-border"><Home className="w-4 h-4 text-muted-foreground" /></span>
                        <input type="text" required value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm" placeholder="15 Rue des Frères..." />
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/10 border border-accent/30 p-4 text-sm">
                    <p className="font-medium mb-1">{c.paymentMethod}</p>
                    <p className="text-muted-foreground">{c.cashOnDelivery}</p>
                  </div>

                  <button type="submit" disabled={!wilayaSelected} className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-[0.2em] uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-40">
                    {wilayaSelected ? `${c.placeOrder} — ${grandTotal.toLocaleString()} ${t.products.currency}` : c.form.selectWilaya}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
