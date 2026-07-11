import * as db from "./db"

export interface Subscriber { id: number; email: string; date: string }
export interface Appointment { id: number; name: string; email: string; phone?: string; date?: string; message?: string; createdAt: string; status: string }
export interface ContactMessage { id: number; name: string; email: string; subject?: string; message: string; createdAt: string; read: boolean }
export interface Product { id: number; name: string; name_fr?: string; name_ar?: string; category: "men" | "women" | "children"; sub: string; sub_fr?: string; sub_ar?: string; price: number; stock: number; image: string; isNew: boolean }
export interface PageContent { page: string; title: string; subtitle: string; description: string; images: string[]; published: boolean }
export interface Order { id: string; items: { id: number; name: string; price: number; quantity: number; category: string }[]; total: number; shippingPrice: number; grandTotal: number; customer: { name: string; phone: string; wilaya: string; commune: string; address: string }; createdAt: string; status: string }

function mapProduct(row: db.ProductRow, lang?: string): Product {
  return { id: row.id, name: lang === "fr" ? (row.name_fr || row.name_en) : lang === "ar" ? (row.name_ar || row.name_en) : row.name_en, name_fr: row.name_fr, name_ar: row.name_ar, category: row.category, sub: lang === "fr" ? (row.sub_fr || row.sub_en) : lang === "ar" ? (row.sub_ar || row.sub_en) : row.sub_en, sub_fr: row.sub_fr, sub_ar: row.sub_ar, price: row.price, stock: row.stock, image: row.image, isNew: row.isNew === 1 }
}

function mapContent(row: db.PageContentRow, lang?: string): PageContent {
  return { page: row.page, title: lang === "fr" ? (row.title_fr || row.title) : lang === "ar" ? (row.title_ar || row.title) : row.title, subtitle: lang === "fr" ? (row.subtitle_fr || row.subtitle) : lang === "ar" ? (row.subtitle_ar || row.subtitle) : row.subtitle, description: lang === "fr" ? (row.description_fr || row.description) : lang === "ar" ? (row.description_ar || row.description) : row.description, images: JSON.parse(row.images || "[]"), published: row.published === 1 }
}

function mapOrder(row: db.OrderRow): Order {
  return { id: row.id, items: JSON.parse(row.items), total: row.total, shippingPrice: row.shippingPrice, grandTotal: row.grandTotal, customer: JSON.parse(row.customer), createdAt: row.createdAt, status: row.status }
}

class DataStore {
  searchProducts(query: string, lang?: string) { return db.searchProducts(query).map(r => mapProduct(r, lang)) }
  getProducts(category?: string, sub?: string, lang?: string) { return db.getProducts(category, sub).map(r => mapProduct(r, lang)) }
  getProduct(id: number, lang?: string) { const p = db.getProduct(id); return p ? mapProduct(p, lang) : null }
  addProduct(data: any) { return mapProduct(db.addProduct(data)) }
  updateProduct(id: number, data: any) { const p = db.updateProduct(id, data); return p ? mapProduct(p) : null }
  deleteProduct(id: number) { db.deleteProduct(id) }

  getSubscribers() { return db.getSubscribers().map(s => ({ ...s })) as Subscriber[] }
  addSubscriber(email: string) { return db.addSubscriber(email) }
  deleteSubscriber(id: string) { db.deleteSubscriber(Number(id)) }

  getAppointments() { return db.getAppointments().map(a => ({ ...a })) as Appointment[] }
  addAppointment(data: any) { db.addAppointment(data) }
  updateAppointmentStatus(id: string, status: string) { db.updateAppointmentStatus(Number(id), status) }
  deleteAppointment(id: string) { db.deleteAppointment(Number(id)) }

  getMessages() { return db.getMessages().map(m => ({ ...m, read: m.read === 1 })) as ContactMessage[] }
  addMessage(data: any) { db.addMessage(data) }
  markAsRead(id: string) { db.markAsRead(Number(id)) }
  deleteMessage(id: string) { db.deleteMessage(Number(id)) }

  getAllContent(lang?: string) { return db.getAllPageContent().map(c => mapContent(c, lang)) }
  getContent(page: string, lang?: string) { const c = db.getPageContent(page); return c ? mapContent(c, lang) : null }
  updateContent(page: string, data: any) { db.updatePageContent(page, data) }

  getOrders() { return db.getOrders().map(mapOrder) }
  addOrder(data: any) { db.addOrder(data) }
  updateOrderStatus(id: string, status: string) { db.updateOrderStatus(id, status) }

  createUser(name: string, email: string, password: string) { return db.createUser(name, email, password) }
  getUserByEmail(email: string) { return db.getUserByEmail(email) }
  getUserById(id: number) { return db.getUserById(id) }

  getStats() { return db.getStats() }
}

export const store = new DataStore()