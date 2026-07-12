"use client"

import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import { Sparkles, Send, RefreshCw, Shirt, User, Ruler, Palette, ShoppingBag, Heart, Check, Camera } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"

interface Product {
  id: number
  name: string
  category: string
  sub: string
  subKey: string
  price: number
  stock: number
  image: string
  isNew: boolean
  sizes?: string[]
  colors?: { name: string; hex: string }[]
}

interface ChatMsg {
  role: "user" | "assistant"
  content: string
}

const sizeGuide = [
  { size: "XS", chest: "82-86", waist: "64-68", hip: "88-92", height: "155-165", weight: "45-55" },
  { size: "S", chest: "86-92", waist: "68-74", hip: "92-96", height: "160-170", weight: "55-65" },
  { size: "M", chest: "92-98", waist: "74-80", hip: "96-100", height: "165-175", weight: "65-75" },
  { size: "L", chest: "98-104", waist: "80-86", hip: "100-106", height: "170-180", weight: "75-85" },
  { size: "XL", chest: "104-110", waist: "86-92", hip: "106-112", height: "175-185", weight: "85-95" },
]

export default function VirtualTryonPage() {
  const { t, lang } = useI18n()
  const vt = t.virtualTryon
  const params = useParams()
  const productId = params.productId as string
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  const [product, setProduct] = useState<Product | null>(null)
  const [facePhoto, setFacePhoto] = useState<string | null>(null)
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`/api/products/${productId}?lang=${lang}`).then(r => r.ok ? r.json() : null).then(setProduct)
  }, [productId, lang])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  useEffect(() => {
    if (product && chatMessages.length === 0) {
      setChatMessages([{ role: "assistant", content: vt.agentIntro }])
    }
  }, [product, vt])

  useEffect(() => {
    if (!height || !weight) { setRecommendedSize(null); return }
    const h = parseFloat(height)
    const w = parseFloat(weight)
    if (isNaN(h) || isNaN(w)) return
    if (h < 155 || w < 45) setRecommendedSize("XS")
    else if (h < 165 || w < 60) setRecommendedSize("S")
    else if (h < 175 || w < 75) setRecommendedSize("M")
    else if (h < 185 || w < 90) setRecommendedSize("L")
    else setRecommendedSize("XL")
  }, [height, weight])

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setFacePhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  async function handleChatSend() {
    if (!chatInput.trim()) return
    const userMsg = chatInput.trim()
    setChatInput("")
    setChatMessages(prev => [...prev, { role: "user", content: userMsg }])
    setChatLoading(true)
    try {
      const res = await fetch("/api/virtual-tryon/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, { role: "user", content: userMsg }].map(m => ({ role: m.role, content: m.content })),
          lang,
        }),
      })
      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || data.error || "I'm sorry, I couldn't process that."
      setChatMessages(prev => [...prev, { role: "assistant", content: reply }])
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting." }])
    }
    setChatLoading(false)
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-accent" />
      </div>
    )
  }

  const guide = sizeGuide.find(s => s.size === (selectedSize || recommendedSize))

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-12">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">{product.name}</p>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight">{vt.title}</h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">{vt.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Product Display */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-border bg-background overflow-hidden">
              <div className="aspect-[3/4] relative bg-secondary/10">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.isNew && <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs px-3 py-1 tracking-wider uppercase">{t.featured.new}</span>}
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-serif text-xl">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.sub}</p>
                <p className="text-xl font-serif">{product.price.toLocaleString()} {t.products.currency}</p>
                {selectedColor && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: product.colors?.find(c => c.name === selectedColor)?.hex || "#000" }} />
                    {selectedColor}
                  </div>
                )}
              </div>
            </div>

            <div className="border border-border bg-background p-6 space-y-4">
              <div onClick={() => fileRef.current?.click()} className="flex items-center gap-4 cursor-pointer group">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary/20 flex items-center justify-center group-hover:ring-2 ring-accent transition-all">
                  {facePhoto ? <img src={facePhoto} className="w-full h-full object-cover" /> : <Camera className="w-6 h-6 text-muted-foreground" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{vt.uploadPhoto}</p>
                  <p className="text-xs text-muted-foreground">{vt.uploadDesc}</p>
                </div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Ruler className="w-3 h-3" />{vt.height}</label>
                  <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" className="w-full px-3 py-2 bg-secondary/10 border border-border focus:border-accent outline-none text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><User className="w-3 h-3" />{vt.weight}</label>
                  <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" className="w-full px-3 py-2 bg-secondary/10 border border-border focus:border-accent outline-none text-sm" />
                </div>
              </div>

              {recommendedSize && (
                <div className="bg-accent/10 border border-accent/30 p-3 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.products.size}:</p>
                  <p className="font-serif text-2xl text-accent">{recommendedSize}</p>
                </div>
              )}
            </div>
          </div>

          {/* Customization + Mirror */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-border bg-background p-6 space-y-6">
              <h2 className="font-serif text-lg flex items-center gap-2"><Shirt className="w-4 h-4 text-accent" />{vt.size}</h2>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || ["S", "M", "L", "XL"]).map(s => (
                  <button key={s} onClick={() => { setSelectedSize(s); if (recommendedSize === s) setRecommendedSize(null) }}
                    className={`px-5 py-2.5 text-sm border transition-all ${selectedSize === s ? "border-accent bg-accent text-accent-foreground" : recommendedSize === s ? "border-accent/50 bg-accent/5" : "border-border hover:border-accent"}`}>
                    {s}
                    {recommendedSize === s && <span className="ml-1 text-[10px] opacity-70">✓</span>}
                  </button>
                ))}
              </div>

              <h2 className="font-serif text-lg flex items-center gap-2"><Palette className="w-4 h-4 text-accent" />{vt.color}</h2>
              <div className="flex flex-wrap gap-2">
                {(product.colors || [{ name: "Black", hex: "#000000" }, { name: "White", hex: "#FFFFFF" }, { name: "Navy", hex: "#000080" }, { name: "Beige", hex: "#F5F5DC" }]).map(c => (
                  <button key={c.name} onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm border transition-colors ${selectedColor === c.name ? "border-accent bg-accent/5" : "border-border hover:border-accent"}`}>
                    <span className="w-3.5 h-3.5 rounded-full border" style={{ backgroundColor: c.hex }} />
                    {c.name}
                  </button>
                ))}
              </div>

              {guide && (
                <div className="border border-border p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{vt.size}: {guide.size}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <span>Poitrine: {guide.chest} cm</span>
                    <span>Taille: {guide.waist} cm</span>
                    <span>Hanches: {guide.hip} cm</span>
                    <span>Taille: {guide.height} cm</span>
                  </div>
                </div>
              )}

              {selectedSize && selectedColor && (
                <div className="flex gap-3">
                  <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1, category: product.category })}
                    className="flex-1 bg-primary text-primary-foreground py-3 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4" /> {t.featured.add}
                  </button>
                  <button onClick={() => toggleFavorite({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category })}
                    className="w-12 border border-border flex items-center justify-center hover:bg-secondary transition-colors" aria-label={t.featured.addToFavorites}>
                    <Heart className={`w-4 h-4 ${isFavorite(product.id) ? "fill-accent text-accent" : ""}`} />
                  </button>
                </div>
              )}
            </div>

            <div className="border border-border bg-background p-6">
              <h2 className="font-serif text-lg flex items-center gap-2 mb-4"><Check className="w-4 h-4 text-accent" />Ma Sélection</h2>
              <div className="flex items-center gap-4 p-3 bg-secondary/10 rounded">
                <img src={product.image} alt={product.name} className="w-16 h-20 object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedColor || "—"} · {selectedSize || "—"}</p>
                  <p className="text-sm font-serif mt-1">{product.price.toLocaleString()} {t.products.currency}</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Chat */}
          <div className="lg:col-span-1 border border-border bg-background flex flex-col h-[600px]">
            <div className="p-4 border-b border-border">
              <h2 className="font-serif text-lg flex items-center gap-2"><Sparkles className="w-4 h-4 text-accent" />{vt.aiAgent}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[90%] p-3 text-sm leading-relaxed ${msg.role === "user" ? "bg-accent text-accent-foreground rounded-l-xl rounded-tr-xl" : "bg-secondary/20 rounded-r-xl rounded-tl-xl"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/20 rounded-r-xl rounded-tl-xl p-3"><RefreshCw className="w-4 h-4 animate-spin" /></div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={e => { e.preventDefault(); handleChatSend() }} className="p-4 border-t border-border flex gap-2">
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder={vt.chatPlaceholder}
                className="flex-1 px-4 py-2.5 bg-secondary/10 border border-border focus:border-accent outline-none text-sm" />
              <button type="submit" disabled={!chatInput.trim() || chatLoading}
                className="px-4 bg-accent text-accent-foreground hover:opacity-90 transition-opacity disabled:opacity-50">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
