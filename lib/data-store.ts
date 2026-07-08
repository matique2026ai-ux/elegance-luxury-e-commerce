// In-memory data store (replace with database later)

export interface Subscriber {
  id: string
  email: string
  date: string
}

export interface Appointment {
  id: string
  name: string
  email: string
  phone?: string
  date?: string
  message?: string
  createdAt: string
  status: "pending" | "confirmed" | "cancelled"
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  createdAt: string
  read: boolean
}

export interface Product {
  id: number
  name: string
  name_fr?: string
  name_ar?: string
  category: "men" | "women" | "children"
  sub: string
  sub_fr?: string
  sub_ar?: string
  price: number
  image: string
  isNew: boolean
}

export interface PageContent {
  page: string
  title: string
  subtitle: string
  description: string
  images: string[]
  published: boolean
}

export interface Order {
  id: string
  items: { id: number; name: string; price: number; quantity: number; category: string }[]
  total: number
  shippingPrice: number
  grandTotal: number
  customer: {
    name: string
    phone: string
    wilaya: string
    commune: string
    address: string
  }
  createdAt: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
}

class DataStore {
  private subscribers: Subscriber[] = [
    { id: "1", email: "client@luxe.com", date: new Date().toISOString() },
    { id: "2", email: "vip@herahima.com", date: new Date().toISOString() },
    { id: "3", email: "hello@example.com", date: new Date(Date.now() - 86400000).toISOString() },
  ]

  private appointments: Appointment[] = [
    { id: "1", name: "Sophie Laurent", email: "sophie@example.com", phone: "+33 6 12 34 56 78", date: "2026-07-15", message: "I'd like to discuss a bespoke gown for an event.", createdAt: new Date().toISOString(), status: "pending" },
    { id: "2", name: "Marc Dubois", email: "marc@example.com", phone: "+33 6 98 76 54 32", date: "2026-07-20", message: "Interested in the new jewelry collection.", createdAt: new Date(Date.now() - 86400000).toISOString(), status: "confirmed" },
  ]

  private messages: ContactMessage[] = [
    { id: "1", name: "Isabelle Moreau", email: "isabelle@example.com", subject: "Product inquiry", message: "I was wondering if the Duchess Bag is available in burgundy leather.", createdAt: new Date().toISOString(), read: false },
    { id: "2", name: "James Wilson", email: "james@example.com", subject: "Shipping question", message: "How long does shipping to the US typically take?", createdAt: new Date(Date.now() - 172800000).toISOString(), read: true },
  ]

  private products: Product[] = [
    { id: 1, name: "Wool Tailored Suit", name_fr: "Costume en Laine Sur Mesure", name_ar: "بدلة صوف مفصلة", category: "men", sub: "Clothing", sub_fr: "Vêtements", sub_ar: "ملابس", price: 3200, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop", isNew: true },
    { id: 2, name: "Linen Blazer", name_fr: "Blazer en Lin", name_ar: "بليزر كتان", category: "men", sub: "Clothing", sub_fr: "Vêtements", sub_ar: "ملابس", price: 1800, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop", isNew: false },
    { id: 3, name: "Leather Oxford Shoes", name_fr: "Chaussures Oxford en Cuir", name_ar: "أحذية أوكسفورد جلدية", category: "men", sub: "Shoes", sub_fr: "Chaussures", sub_ar: "أحذية", price: 1450, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&h=600&fit=crop", isNew: false },
    { id: 4, name: "Cashmere Scarf", name_fr: "Écharpe en Cachemire", name_ar: "وشاح كشمير", category: "men", sub: "Accessories", sub_fr: "Accessoires", sub_ar: "إكسسوارات", price: 680, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=600&fit=crop", isNew: true },
    { id: 5, name: "Eau de Parfum", name_fr: "Eau de Parfum", name_ar: "عطر", category: "men", sub: "Fragrances", sub_fr: "Parfums", sub_ar: "عطور", price: 320, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop", isNew: true },
    { id: 6, name: "Silk Evening Gown", name_fr: "Robe du Soir en Soie", name_ar: "فستان سهرة حريري", category: "women", sub: "Clothing", sub_fr: "Vêtements", sub_ar: "ملابس", price: 8750, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop", isNew: true },
    { id: 7, name: "Pearl Necklace", name_fr: "Collier de Perles", name_ar: "عقد لؤلؤ", category: "women", sub: "Accessories", sub_fr: "Accessoires", sub_ar: "إكسسوارات", price: 4890, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop", isNew: true },
    { id: 8, name: "Leather Duchess Bag", name_fr: "Sac Duchesse en Cuir", name_ar: "حقيبة دوقة جلدية", category: "women", sub: "Accessories", sub_fr: "Accessoires", sub_ar: "إكسسوارات", price: 2450, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop", isNew: false },
    { id: 9, name: "Floral Summer Dress", name_fr: "Robe d'Été Fleurie", name_ar: "فستان صيفي مزهر", category: "women", sub: "Clothing", sub_fr: "Vêtements", sub_ar: "ملابس", price: 1200, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92b1?w=500&h=600&fit=crop", isNew: false },
    { id: 10, name: "Sapphire Ring", name_fr: "Bague Saphir", name_ar: "خاتم ياقوت أزرق", category: "women", sub: "Accessories", sub_fr: "Accessoires", sub_ar: "إكسسوارات", price: 12500, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=600&fit=crop", isNew: false },
    { id: 11, name: "Stiletto Heels", name_fr: "Talons Aiguilles", name_ar: "كعب عالي", category: "women", sub: "Shoes", sub_fr: "Chaussures", sub_ar: "أحذية", price: 980, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop", isNew: true },
    { id: 12, name: "Eau de Parfum Rose", name_fr: "Eau de Parfum Rose", name_ar: "عطر ورد", category: "women", sub: "Fragrances", sub_fr: "Parfums", sub_ar: "عطور", price: 380, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop", isNew: false },
    { id: 13, name: "Cashmere Cardigan", name_fr: "Cardigan en Cachemire", name_ar: "كارديغان كشمير", category: "children", sub: "Clothing", sub_fr: "Vêtements", sub_ar: "ملابس", price: 480, image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&h=600&fit=crop", isNew: false },
    { id: 14, name: "Mini Leather Sneakers", name_fr: "Baskets Mini Cuir", name_ar: "حذاء رياضي جلدي صغير", category: "children", sub: "Shoes", sub_fr: "Chaussures", sub_ar: "أحذية", price: 280, image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&h=600&fit=crop", isNew: true },
    { id: 15, name: "Kids Silk Bow Tie", name_fr: "Nœud Papillon en Soie Enfant", name_ar: "ربطة عنق حريرية للأطفال", category: "children", sub: "Accessories", sub_fr: "Accessoires", sub_ar: "إكسسوارات", price: 150, image: "https://images.unsplash.com/photo-1602173211822-8347a13dc5ad?w=500&h=600&fit=crop", isNew: true },
    { id: 16, name: "Velvet Party Dress", name_fr: "Robe de Fête en Velours", name_ar: "فستان حفلة مخملي", category: "children", sub: "Clothing", sub_fr: "Vêtements", sub_ar: "ملابس", price: 650, image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&h=600&fit=crop", isNew: true },
  ]

  private content: Record<string, PageContent> = {
    heritage: {
      page: "heritage", title: "Our Heritage", subtitle: "A craftsmanship passed down through generations",
      description: "Since 1847, our house has perpetuated French artisanal excellence. Each piece is the result of a dialogue between tradition and modernity.",
      images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%282%29-qsHmoJIZtkh9Zw7PIDspOZVh50aE2F.png"], published: true,
    },
    services: {
      page: "services", title: "Exceptional Service", subtitle: "An Experience Beyond Purchase",
      description: "From the moment you discover our pieces to years of ownership, we ensure every interaction reflects our commitment to excellence.",
      images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Emballage%20Luxe%203-O7x3bwTICrWOx8qXrukiyPtc260H9T.png"], published: true,
    },
    boutiques: {
      page: "boutiques", title: "Our Boutiques", subtitle: "Visit Us",
      description: "Discover our collections in an exceptional setting and benefit from personalized advice from our experts.",
      images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Boutique%20Paris-Ds9XeWSdUztVjHSz6JYUMoW4pz7kHM.png"], published: true,
    },
  }

  private orders: Order[] = [
    {
      id: "1", items: [{ id: 1, name: "Duchess Bag", price: 2450, quantity: 1, category: "Leather Goods" }],
      total: 2450, shippingPrice: 500, grandTotal: 2950,
      customer: { name: "Ahmed Benali", phone: "0555 12 34 56", wilaya: "Alger", commune: "Hydra", address: "15 Rue des Frères" },
      createdAt: new Date().toISOString(), status: "pending",
    },
  ]

  private idCounter = 3

  private nextId() {
    return String(++this.idCounter)
  }

  // Subscribers
  getSubscribers() { return [...this.subscribers] }
  addSubscriber(email: string) {
    if (this.subscribers.find(s => s.email === email)) return false
    this.subscribers.push({ id: this.nextId(), email, date: new Date().toISOString() })
    return true
  }
  deleteSubscriber(id: string) {
    this.subscribers = this.subscribers.filter(s => s.id !== id)
  }

  // Appointments
  getAppointments() { return [...this.appointments] }
  addAppointment(data: Omit<Appointment, "id" | "createdAt" | "status">) {
    this.appointments.push({ ...data, id: this.nextId(), createdAt: new Date().toISOString(), status: "pending" })
  }
  updateAppointmentStatus(id: string, status: Appointment["status"]) {
    const a = this.appointments.find(a => a.id === id)
    if (a) a.status = status
  }
  deleteAppointment(id: string) {
    this.appointments = this.appointments.filter(a => a.id !== id)
  }

  // Messages
  getMessages() { return [...this.messages] }
  addMessage(data: Omit<ContactMessage, "id" | "createdAt" | "read">) {
    this.messages.push({ ...data, id: this.nextId(), createdAt: new Date().toISOString(), read: false })
  }
  markAsRead(id: string) {
    const m = this.messages.find(m => m.id === id)
    if (m) m.read = true
  }
  deleteMessage(id: string) {
    this.messages = this.messages.filter(m => m.id !== id)
  }

  // Products
  getProducts(category?: string, sub?: string, lang?: string) {
    let result = [...this.products]
    if (category) result = result.filter(p => p.category === category)
    if (sub) result = result.filter(p => p.sub === sub)
    if (lang && lang !== "en") {
      const isFr = lang === "fr"
      result = result.map(p => ({
        ...p,
        name: isFr ? (p.name_fr || p.name) : (p.name_ar || p.name),
      }))
    }
    return result
  }
  addProduct(data: Omit<Product, "id">) {
    const id = Math.max(...this.products.map(p => p.id), 0) + 1
    const product = { ...data, id }
    this.products.push(product)
    return product
  }
  updateProduct(id: number, data: Partial<Product>) {
    const idx = this.products.findIndex(p => p.id === id)
    if (idx === -1) return null
    this.products[idx] = { ...this.products[idx], ...data }
    return this.products[idx]
  }
  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id)
  }

  // Content
  getAllContent() { return Object.values(this.content) }
  getContent(page: string) { return this.content[page] || null }
  updateContent(page: string, data: Partial<PageContent>) {
    if (this.content[page]) {
      this.content[page] = { ...this.content[page], ...data }
    } else {
      this.content[page] = { page, title: data.title || "", subtitle: data.subtitle || "", description: data.description || "", images: data.images || [], published: data.published ?? false }
    }
  }

  // Orders
  getOrders() { return [...this.orders] }
  addOrder(data: Omit<Order, "id" | "createdAt" | "status">) {
    this.orders.unshift({ ...data, id: this.nextId(), createdAt: new Date().toISOString(), status: "pending" })
  }
  updateOrderStatus(id: string, status: Order["status"]) {
    const o = this.orders.find(o => o.id === id)
    if (o) o.status = status
  }

  // Stats
  getStats() {
    return {
      totalSubscribers: this.subscribers.length,
      pendingAppointments: this.appointments.filter(a => a.status === "pending").length,
      unreadMessages: this.messages.filter(m => !m.read).length,
      totalAppointments: this.appointments.length,
      totalOrders: this.orders.length,
      pendingOrders: this.orders.filter(o => o.status === "pending").length,
    }
  }
}

export const store = new DataStore()
