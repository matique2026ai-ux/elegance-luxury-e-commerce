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
