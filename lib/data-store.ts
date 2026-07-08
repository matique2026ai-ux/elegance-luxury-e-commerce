import { getDb } from "./db"

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
  stock: number
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

function rowToProduct(row: any, lang?: string): Product {
  const p: Product = {
    id: row.id,
    name: row.name_en,
    name_fr: row.name_fr,
    name_ar: row.name_ar,
    category: row.category,
    sub: row.sub_en,
    sub_fr: row.sub_fr,
    sub_ar: row.sub_ar,
    price: row.price,
    stock: row.stock,
    image: row.image,
    isNew: row.isNew === 1,
  }
  if (lang && lang !== "en") {
    p.name = lang === "fr" ? (row.name_fr || row.name_en) : (row.name_ar || row.name_en)
  }
  return p
}

function rowToContent(row: any): PageContent {
  return {
    page: row.page,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    images: JSON.parse(row.images || "[]"),
    published: row.published === 1,
  }
}

function rowToOrder(row: any): Order {
  return {
    id: row.id,
    items: JSON.parse(row.items),
    total: row.total,
    shippingPrice: row.shippingPrice,
    grandTotal: row.grandTotal,
    customer: JSON.parse(row.customer),
    createdAt: row.createdAt,
    status: row.status,
  }
}

class DataStore {
  getProducts(category?: string, sub?: string, lang?: string) {
    const db = getDb()
    let sql = "SELECT * FROM products"
    const params: any[] = []
    const conditions: string[] = []
    if (category) { conditions.push("category = ?"); params.push(category) }
    if (sub) { conditions.push("sub_en = ?"); params.push(sub) }
    if (conditions.length) sql += " WHERE " + conditions.join(" AND ")
    sql += " ORDER BY id ASC"
    const rows = db.prepare(sql).all(...params)
    return rows.map(r => rowToProduct(r, lang))
  }

  getProduct(id: number, lang?: string) {
    const row = getDb().prepare("SELECT * FROM products WHERE id = ?").get(id) as any
    return row ? rowToProduct(row, lang) : null
  }

  addProduct(data: Omit<Product, "id">) {
    const db = getDb()
    const result = db.prepare(
      `INSERT INTO products (name_en, name_fr, name_ar, category, sub_en, sub_fr, sub_ar, price, stock, image, isNew)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(data.name, data.name_fr || null, data.name_ar || null, data.category, data.sub, data.sub_fr || null, data.sub_ar || null, data.price, data.stock || 0, data.image, data.isNew ? 1 : 0)
    return this.getProduct(Number(result.lastInsertRowid))
  }

  updateProduct(id: number, data: Partial<Product>) {
    const db = getDb()
    const fields: string[] = []
    const params: any[] = []
    if (data.name !== undefined) { fields.push("name_en = ?"); params.push(data.name) }
    if (data.name_fr !== undefined) { fields.push("name_fr = ?"); params.push(data.name_fr) }
    if (data.name_ar !== undefined) { fields.push("name_ar = ?"); params.push(data.name_ar) }
    if (data.category !== undefined) { fields.push("category = ?"); params.push(data.category) }
    if (data.sub !== undefined) { fields.push("sub_en = ?"); params.push(data.sub) }
    if (data.sub_fr !== undefined) { fields.push("sub_fr = ?"); params.push(data.sub_fr) }
    if (data.sub_ar !== undefined) { fields.push("sub_ar = ?"); params.push(data.sub_ar) }
    if (data.price !== undefined) { fields.push("price = ?"); params.push(data.price) }
    if (data.stock !== undefined) { fields.push("stock = ?"); params.push(data.stock) }
    if (data.image !== undefined) { fields.push("image = ?"); params.push(data.image) }
    if (data.isNew !== undefined) { fields.push("isNew = ?"); params.push(data.isNew ? 1 : 0) }
    if (!fields.length) return null
    params.push(id)
    db.prepare(`UPDATE products SET ${fields.join(", ")} WHERE id = ?`).run(...params)
    return this.getProduct(id)
  }

  deleteProduct(id: number) {
    getDb().prepare("DELETE FROM products WHERE id = ?").run(id)
  }

  // Subscribers
  getSubscribers() {
    return getDb().prepare("SELECT * FROM subscribers ORDER BY id DESC").all() as Subscriber[]
  }

  addSubscriber(email: string) {
    try {
      getDb().prepare("INSERT INTO subscribers (email) VALUES (?)").run(email)
      return true
    } catch {
      return false
    }
  }

  deleteSubscriber(id: string) {
    getDb().prepare("DELETE FROM subscribers WHERE id = ?").run(Number(id))
  }

  // Appointments
  getAppointments() {
    return getDb().prepare("SELECT * FROM appointments ORDER BY id DESC").all() as Appointment[]
  }

  addAppointment(data: Omit<Appointment, "id" | "createdAt" | "status">) {
    getDb().prepare("INSERT INTO appointments (name, email, phone, date, message) VALUES (?, ?, ?, ?, ?)")
      .run(data.name, data.email, data.phone || null, data.date || null, data.message || null)
  }

  updateAppointmentStatus(id: string, status: Appointment["status"]) {
    getDb().prepare("UPDATE appointments SET status = ? WHERE id = ?").run(status, Number(id))
  }

  deleteAppointment(id: string) {
    getDb().prepare("DELETE FROM appointments WHERE id = ?").run(Number(id))
  }

  // Messages
  getMessages() {
    const rows = getDb().prepare("SELECT * FROM contact_messages ORDER BY id DESC").all() as any[]
    return rows.map(r => ({ ...r, read: r.read === 1 })) as ContactMessage[]
  }

  addMessage(data: Omit<ContactMessage, "id" | "createdAt" | "read">) {
    getDb().prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)")
      .run(data.name, data.email, data.subject || null, data.message)
  }

  markAsRead(id: string) {
    getDb().prepare("UPDATE contact_messages SET read = 1 WHERE id = ?").run(Number(id))
  }

  deleteMessage(id: string) {
    getDb().prepare("DELETE FROM contact_messages WHERE id = ?").run(Number(id))
  }

  // Content
  getAllContent() {
    const rows = getDb().prepare("SELECT * FROM page_content").all() as any[]
    return rows.map(rowToContent)
  }

  getContent(page: string) {
    const row = getDb().prepare("SELECT * FROM page_content WHERE page = ?").get(page) as any
    return row ? rowToContent(row) : null
  }

  updateContent(page: string, data: Partial<PageContent>) {
    const db = getDb()
    const existing = db.prepare("SELECT * FROM page_content WHERE page = ?").get(page) as any
    if (existing) {
      const fields: string[] = []
      const params: any[] = []
      if (data.title !== undefined) { fields.push("title = ?"); params.push(data.title) }
      if (data.subtitle !== undefined) { fields.push("subtitle = ?"); params.push(data.subtitle) }
      if (data.description !== undefined) { fields.push("description = ?"); params.push(data.description) }
      if (data.images !== undefined) { fields.push("images = ?"); params.push(JSON.stringify(data.images)) }
      if (data.published !== undefined) { fields.push("published = ?"); params.push(data.published ? 1 : 0) }
      if (fields.length) {
        params.push(page)
        db.prepare(`UPDATE page_content SET ${fields.join(", ")} WHERE page = ?`).run(...params)
      }
    } else {
      db.prepare("INSERT INTO page_content (page, title, subtitle, description, images, published) VALUES (?, ?, ?, ?, ?, ?)")
        .run(page, data.title || "", data.subtitle || "", data.description || "", JSON.stringify(data.images || []), data.published ? 1 : 0)
    }
  }

  // Orders
  getOrders() {
    const rows = getDb().prepare("SELECT * FROM orders ORDER BY id DESC").all() as any[]
    return rows.map(rowToOrder)
  }

  addOrder(data: Omit<Order, "id" | "createdAt" | "status">) {
    const id = crypto.randomUUID()
    getDb().prepare(
      "INSERT INTO orders (id, items, total, shippingPrice, grandTotal, customer) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(id, JSON.stringify(data.items), data.total, data.shippingPrice, data.grandTotal, JSON.stringify(data.customer))
  }

  updateOrderStatus(id: string, status: Order["status"]) {
    getDb().prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id)
  }

  // Stats
  getStats() {
    const db = getDb()
    const totalSubscribers = (db.prepare("SELECT COUNT(*) as c FROM subscribers").get() as any).c
    const pendingAppointments = (db.prepare("SELECT COUNT(*) as c FROM appointments WHERE status = 'pending'").get() as any).c
    const unreadMessages = (db.prepare("SELECT COUNT(*) as c FROM contact_messages WHERE read = 0").get() as any).c
    const totalAppointments = (db.prepare("SELECT COUNT(*) as c FROM appointments").get() as any).c
    const totalOrders = (db.prepare("SELECT COUNT(*) as c FROM orders").get() as any).c
    const pendingOrders = (db.prepare("SELECT COUNT(*) as c FROM orders WHERE status = 'pending'").get() as any).c
    return { totalSubscribers, pendingAppointments, unreadMessages, totalAppointments, totalOrders, pendingOrders }
  }
}

export const store = new DataStore()
