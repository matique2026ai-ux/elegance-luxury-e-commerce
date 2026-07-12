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
  async searchProducts(query: string, lang?: string) { return (await db.searchProducts(query)).map(r => mapProduct(r, lang)) }
  async getProducts(category?: string, sub?: string, lang?: string) { return (await db.getProducts(category, sub)).map(r => mapProduct(r, lang)) }
  async getProduct(id: number, lang?: string) { const p = await db.getProduct(id); return p ? mapProduct(p, lang) : null }
  async addProduct(data: any) { return mapProduct(await db.addProduct(data)) }
  async updateProduct(id: number, data: any) { const p = await db.updateProduct(id, data); return p ? mapProduct(p) : null }
  async deleteProduct(id: number) { await db.deleteProduct(id) }

  async getSubscribers() { return (await db.getSubscribers()).map(s => ({ ...s })) as Subscriber[] }
  async addSubscriber(email: string) { return db.addSubscriber(email) }
  async deleteSubscriber(id: string) { await db.deleteSubscriber(Number(id)) }

  async getAppointments() { return (await db.getAppointments()).map(a => ({ ...a })) as Appointment[] }
  async addAppointment(data: any) { await db.addAppointment(data) }
  async updateAppointmentStatus(id: string, status: string) { await db.updateAppointmentStatus(Number(id), status) }
  async deleteAppointment(id: string) { await db.deleteAppointment(Number(id)) }

  async getMessages() { return (await db.getMessages()).map(m => ({ ...m, read: m.read === 1 })) as ContactMessage[] }
  async addMessage(data: any) { await db.addMessage(data) }
  async markAsRead(id: string) { await db.markAsRead(Number(id)) }
  async deleteMessage(id: string) { await db.deleteMessage(Number(id)) }

  async getAllContent(lang?: string) { return (await db.getAllPageContent()).map(c => mapContent(c, lang)) }
  async getContent(page: string, lang?: string) { const c = await db.getPageContent(page); return c ? mapContent(c, lang) : null }
  async updateContent(page: string, data: any) { await db.updatePageContent(page, data) }

  async getOrders() { return (await db.getOrders()).map(mapOrder) }
  async addOrder(data: any) { await db.addOrder(data) }
  async updateOrderStatus(id: string, status: string) { await db.updateOrderStatus(id, status) }

  async createUser(name: string, email: string, password: string) { return db.createUser(name, email, password) }
  async getUserByEmail(email: string) { return db.getUserByEmail(email) }
  async getUserById(id: number) { return db.getUserById(id) }

  async updateUserName(email: string, name: string) { await db.updateUserName(email, name) }
  async createResetCode(email: string, code: string, expiresAt: string) { await db.createResetCode(email, code, expiresAt) }
  async verifyResetCode(email: string, code: string) { return db.verifyResetCode(email, code) }
  async updatePassword(email: string, newHash: string) { await db.updatePassword(email, newHash) }
  async getAllUsers() { return db.getAllUsers() }
  async deleteUser(id: number) { await db.deleteUser(id) }
  async getStats() { return db.getStats() }
  async logActivity(action: string, entityType: string, entityId: string, description: string, adminName?: string) { return db.logActivity(action, entityType, entityId, description, adminName) }
  async getActivityLog() { return db.getActivityLog() }
  async clearActivityLog() { await db.clearActivityLog() }
  async getCoupons() { return db.getCoupons() }
  async addCoupon(data: any) { return db.addCoupon(data) }
  async updateCoupon(id: number, data: any) { await db.updateCoupon(id, data) }
  async deleteCoupon(id: number) { await db.deleteCoupon(id) }
  async validateCoupon(code: string, total: number) { return db.validateCoupon(code, total) }
  async useCoupon(code: string) { await db.useCoupon(code) }
  async getReviews(productId?: number) { return db.getReviews(productId) }
  async addReview(data: any) { return db.addReview(data) }
  async approveReview(id: number) { await db.approveReview(id) }
  async deleteReview(id: number) { await db.deleteReview(id) }
  async getSettings() { return db.getSettings() }
  async updateSettings(data: any) { await db.updateSettings(data) }
  async getRevenueAnalytics() { return db.getRevenueAnalytics() }
}

export const store = new DataStore()
