import { all, get, getDb, execAsync } from "./db"

export interface Subscriber { id: string; email: string; date: string }
export interface Appointment { id: string; name: string; email: string; phone?: string; date?: string; message?: string; createdAt: string; status: "pending" | "confirmed" | "cancelled" }
export interface ContactMessage { id: string; name: string; email: string; subject?: string; message: string; createdAt: string; read: boolean }
export interface Product { id: number; name: string; name_fr?: string; name_ar?: string; category: "men" | "women" | "children"; sub: string; sub_fr?: string; sub_ar?: string; price: number; stock: number; image: string; isNew: boolean }
export interface PageContent { page: string; title: string; subtitle: string; description: string; images: string[]; published: boolean }
export interface Order { id: string; items: { id: number; name: string; price: number; quantity: number; category: string }[]; total: number; shippingPrice: number; grandTotal: number; customer: { name: string; phone: string; wilaya: string; commune: string; address: string }; createdAt: string; status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" }

function rowToProduct(row: any, lang?: string): Product {
  const p: Product = { id: row.id, name: row.name_en, name_fr: row.name_fr, name_ar: row.name_ar, category: row.category, sub: row.sub_en, sub_fr: row.sub_fr, sub_ar: row.sub_ar, price: row.price, stock: row.stock, image: row.image, isNew: row.isNew === 1 }
  if (lang && lang !== "en") p.name = lang === "fr" ? (row.name_fr || row.name_en) : (row.name_ar || row.name_en)
  return p
}

function rowToContent(row: any, lang?: string): PageContent {
  const c: PageContent = { page: row.page, title: row.title, subtitle: row.subtitle, description: row.description, images: JSON.parse(row.images || "[]"), published: row.published === 1 }
  if (lang && lang !== "en") { c.title = lang === "fr" ? (row.title_fr || row.title) : (row.title_ar || row.title); c.subtitle = lang === "fr" ? (row.subtitle_fr || row.subtitle) : (row.subtitle_ar || row.subtitle); c.description = lang === "fr" ? (row.description_fr || row.description) : (row.description_ar || row.description) }
  return c
}

function rowToOrder(row: any): Order { return { id: row.id, items: JSON.parse(row.items), total: row.total, shippingPrice: row.shippingPrice, grandTotal: row.grandTotal, customer: JSON.parse(row.customer), createdAt: row.createdAt, status: row.status } }

class DataStore {
  async searchProducts(query: string, lang?: string) {
    const db = await getDb()
    const p = `%${query}%`
    return all(db, "SELECT * FROM products WHERE name_en LIKE ? OR name_fr LIKE ? OR name_ar LIKE ? ORDER BY id ASC", [p, p, p]).map(r => rowToProduct(r, lang))
  }

  async getProducts(category?: string, sub?: string, lang?: string) {
    const db = await getDb()
    let sql = "SELECT * FROM products"
    const params: any[] = []
    const conditions: string[] = []
    if (category) { conditions.push("category = ?"); params.push(category) }
    if (sub) { conditions.push("sub_en = ?"); params.push(sub) }
    if (conditions.length) sql += " WHERE " + conditions.join(" AND ")
    sql += " ORDER BY id ASC"
    return all(db, sql, params).map(r => rowToProduct(r, lang))
  }

  async getProduct(id: number, lang?: string) {
    const db = await getDb()
    const row = get(db, "SELECT * FROM products WHERE id = ?", [id])
    return row ? rowToProduct(row, lang) : null
  }

  async addProduct(data: Omit<Product, "id">) {
    const db = await getDb()
    db.run("INSERT INTO products (name_en,name_fr,name_ar,category,sub_en,sub_fr,sub_ar,price,stock,image,isNew) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [data.name, data.name_fr || null, data.name_ar || null, data.category, data.sub, data.sub_fr || null, data.sub_ar || null, data.price, data.stock || 0, data.image, data.isNew ? 1 : 0])
    const row = get(db, "SELECT last_insert_rowid() as id")
    return row ? this.getProduct(row.id) : null
  }

  async updateProduct(id: number, data: Partial<Product>) {
    const db = await getDb()
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
    db.run(`UPDATE products SET ${fields.join(", ")} WHERE id = ?`, params)
    return this.getProduct(id)
  }

  async deleteProduct(id: number) {
    const db = await getDb()
    db.run("DELETE FROM products WHERE id = ?", [id])
  }

  async getSubscribers() { return all(await getDb(), "SELECT * FROM subscribers ORDER BY id DESC") as Subscriber[] }

  async addSubscriber(email: string) {
    try { (await getDb()).run("INSERT INTO subscribers (email) VALUES (?)", [email]); return true } catch { return false }
  }

  async deleteSubscriber(id: string) { (await getDb()).run("DELETE FROM subscribers WHERE id = ?", [Number(id)]) }

  async getAppointments() { return all(await getDb(), "SELECT * FROM appointments ORDER BY id DESC") as Appointment[] }

  async addAppointment(data: Omit<Appointment, "id" | "createdAt" | "status">) {
    (await getDb()).run("INSERT INTO appointments (name, email, phone, date, message) VALUES (?, ?, ?, ?, ?)", [data.name, data.email, data.phone || null, data.date || null, data.message || null])
  }

  async updateAppointmentStatus(id: string, status: Appointment["status"]) {
    (await getDb()).run("UPDATE appointments SET status = ? WHERE id = ?", [status, Number(id)])
  }

  async deleteAppointment(id: string) { (await getDb()).run("DELETE FROM appointments WHERE id = ?", [Number(id)]) }

  async getMessages() {
    const rows = all(await getDb(), "SELECT * FROM contact_messages ORDER BY id DESC") as any[]
    return rows.map(r => ({ ...r, read: r.read === 1 })) as ContactMessage[]
  }

  async addMessage(data: Omit<ContactMessage, "id" | "createdAt" | "read">) {
    (await getDb()).run("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)", [data.name, data.email, data.subject || null, data.message])
  }

  async markAsRead(id: string) { (await getDb()).run("UPDATE contact_messages SET read = 1 WHERE id = ?", [Number(id)]) }

  async deleteMessage(id: string) { (await getDb()).run("DELETE FROM contact_messages WHERE id = ?", [Number(id)]) }

  async getAllContent(lang?: string) { return all(await getDb(), "SELECT * FROM page_content").map(r => rowToContent(r, lang)) }

  async getContent(page: string, lang?: string) {
    const row = get(await getDb(), "SELECT * FROM page_content WHERE page = ?", [page])
    return row ? rowToContent(row, lang) : null
  }

  async updateContent(page: string, data: Partial<PageContent>) {
    const db = await getDb()
    const existing = get(db, "SELECT * FROM page_content WHERE page = ?", [page])
    if (existing) {
      const fields: string[] = []; const params: any[] = []
      if (data.title !== undefined) { fields.push("title = ?"); params.push(data.title) }
      if (data.subtitle !== undefined) { fields.push("subtitle = ?"); params.push(data.subtitle) }
      if (data.description !== undefined) { fields.push("description = ?"); params.push(data.description) }
      if (data.images !== undefined) { fields.push("images = ?"); params.push(JSON.stringify(data.images)) }
      if (data.published !== undefined) { fields.push("published = ?"); params.push(data.published ? 1 : 0) }
      if (fields.length) { params.push(page); db.run(`UPDATE page_content SET ${fields.join(", ")} WHERE page = ?`, params) }
    } else {
      db.run("INSERT INTO page_content (page, title, subtitle, description, images, published) VALUES (?, ?, ?, ?, ?, ?)", [page, data.title || "", data.subtitle || "", data.description || "", JSON.stringify(data.images || []), data.published ? 1 : 0])
    }
  }

  async getOrders() { return all(await getDb(), "SELECT * FROM orders ORDER BY id DESC").map(rowToOrder) }

  async addOrder(data: Omit<Order, "id" | "createdAt" | "status">) {
    const db = await getDb()
    const id = crypto.randomUUID()
    db.run("BEGIN")
    try {
      for (const item of data.items) {
        const product = get(db, "SELECT stock FROM products WHERE id = ?", [item.id])
        if (!product) throw new Error(`Product ${item.id} not found`)
        if (product.stock < item.quantity) throw new Error(`Insufficient stock for product ${item.id}`)
        db.run("UPDATE products SET stock = stock - ? WHERE id = ?", [item.quantity, item.id])
      }
      db.run("INSERT INTO orders (id, items, total, shippingPrice, grandTotal, customer) VALUES (?, ?, ?, ?, ?, ?)", [id, JSON.stringify(data.items), data.total, data.shippingPrice, data.grandTotal, JSON.stringify(data.customer)])
      db.run("COMMIT")
    } catch (e) { db.run("ROLLBACK"); throw e }
  }

  async updateOrderStatus(id: string, status: Order["status"]) {
    (await getDb()).run("UPDATE orders SET status = ? WHERE id = ?", [status, id])
  }

  async createUser(name: string, email: string, password: string) {
    try {
      const db = await getDb()
      db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password])
      const row = get(db, "SELECT last_insert_rowid() as id")
      return { id: Number(row.id), name, email }
    } catch { return null }
  }

  async getUserByEmail(email: string) {
    return get(await getDb(), "SELECT * FROM users WHERE email = ?", [email]) as { id: number; name: string; email: string; password: string } | undefined
  }

  async getUserById(id: number) {
    return get(await getDb(), "SELECT id, name, email, createdAt FROM users WHERE id = ?", [id]) as { id: number; name: string; email: string; createdAt: string } | undefined
  }

  async getStats() {
    const db = await getDb()
    const totalSubscribers = (get(db, "SELECT COUNT(*) as c FROM subscribers") as any)?.c || 0
    const pendingAppointments = (get(db, "SELECT COUNT(*) as c FROM appointments WHERE status = 'pending'") as any)?.c || 0
    const unreadMessages = (get(db, "SELECT COUNT(*) as c FROM contact_messages WHERE read = 0") as any)?.c || 0
    const totalAppointments = (get(db, "SELECT COUNT(*) as c FROM appointments") as any)?.c || 0
    const totalOrders = (get(db, "SELECT COUNT(*) as c FROM orders") as any)?.c || 0
    const pendingOrders = (get(db, "SELECT COUNT(*) as c FROM orders WHERE status = 'pending'") as any)?.c || 0
    return { totalSubscribers, pendingAppointments, unreadMessages, totalAppointments, totalOrders, pendingOrders }
  }
}

export const store = new DataStore()