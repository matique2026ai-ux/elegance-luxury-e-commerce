import { supabase } from "./supabase"

let seeded = false

export interface ProductRow {
  id: number; name_en: string; name_fr?: string; name_ar?: string;
  category: "men" | "women" | "children";
  sub_en: string; sub_fr?: string; sub_ar?: string;
  price: number; stock: number; image: string; isNew: number; createdAt: string
}

export interface PageContentRow {
  page: string; title: string; title_fr?: string; title_ar?: string;
  subtitle: string; subtitle_fr?: string; subtitle_ar?: string;
  description: string; description_fr?: string; description_ar?: string;
  images: string; published: number
}

export interface SubscriberRow { id: number; email: string; date: string }
export interface AppointmentRow { id: number; name: string; email: string; phone?: string; date?: string; message?: string; createdAt: string; status: string }
export interface ContactRow { id: number; name: string; email: string; subject?: string; message: string; createdAt: string; read: number }
export interface UserRow { id: number; name: string; email: string; password: string; createdAt: string }
export interface PasswordResetRow { id: number; email: string; code: string; expires_at: string; used: number; created_at: string }
export interface OrderRow { id: string; items: string; total: number; shippingPrice: number; grandTotal: number; customer: string; createdAt: string; status: string }

async function seed() {
  if (seeded) return
  const { count } = await supabase.from("products").select("*", { count: "exact", head: true })
  if (count && count > 0) { seeded = true; return }

  const products = [
    {name_en:"Wool Tailored Suit",name_fr:"Costume en Laine Sur Mesure",name_ar:"بدلة صوف مفصلة",category:"men",sub_en:"Clothing",sub_fr:"Vêtements",sub_ar:"ملابس",price:3200,stock:10,image:"https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop",isNew:1},
    {name_en:"Linen Blazer",name_fr:"Blazer en Lin",name_ar:"بليزر كتان",category:"men",sub_en:"Clothing",sub_fr:"Vêtements",sub_ar:"ملابس",price:1800,stock:8,image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",isNew:0},
    {name_en:"Leather Oxford Shoes",name_fr:"Chaussures Oxford en Cuir",name_ar:"أحذية أوكسفورد جلدية",category:"men",sub_en:"Shoes",sub_fr:"Chaussures",sub_ar:"أحذية",price:1450,stock:15,image:"https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&h=600&fit=crop",isNew:0},
    {name_en:"Cashmere Scarf",name_fr:"Écharpe en Cachemire",name_ar:"وشاح كشمير",category:"men",sub_en:"Accessories",sub_fr:"Accessoires",sub_ar:"إكسسوارات",price:680,stock:20,image:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=600&fit=crop",isNew:1},
    {name_en:"Eau de Parfum",name_fr:"Eau de Parfum",name_ar:"عطر",category:"men",sub_en:"Fragrances",sub_fr:"Parfums",sub_ar:"عطور",price:320,stock:25,image:"https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop",isNew:1},
    {name_en:"Silk Evening Gown",name_fr:"Robe du Soir en Soie",name_ar:"فستان سهرة حريري",category:"women",sub_en:"Clothing",sub_fr:"Vêtements",sub_ar:"ملابس",price:8750,stock:5,image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",isNew:1},
    {name_en:"Pearl Necklace",name_fr:"Collier de Perles",name_ar:"عقد لؤلؤ",category:"women",sub_en:"Accessories",sub_fr:"Accessoires",sub_ar:"إكسسوارات",price:4890,stock:7,image:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop",isNew:1},
    {name_en:"Leather Duchess Bag",name_fr:"Sac Duchesse en Cuir",name_ar:"حقيبة دوقة جلدية",category:"women",sub_en:"Accessories",sub_fr:"Accessoires",sub_ar:"إكسسوارات",price:2450,stock:12,image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop",isNew:0},
    {name_en:"Floral Summer Dress",name_fr:"Robe d'Été Fleurie",name_ar:"فستان صيفي مزهر",category:"women",sub_en:"Clothing",sub_fr:"Vêtements",sub_ar:"ملابس",price:1200,stock:14,image:"https://images.unsplash.com/photo-1572804013309-59a88b7e92b1?w=500&h=600&fit=crop",isNew:0},
    {name_en:"Sapphire Ring",name_fr:"Bague Saphir",name_ar:"خاتم ياقوت أزرق",category:"women",sub_en:"Accessories",sub_fr:"Accessoires",sub_ar:"إكسسوارات",price:12500,stock:3,image:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=600&fit=crop",isNew:0},
    {name_en:"Stiletto Heels",name_fr:"Talons Aiguilles",name_ar:"كعب عالي",category:"women",sub_en:"Shoes",sub_fr:"Chaussures",sub_ar:"أحذية",price:980,stock:18,image:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop",isNew:1},
    {name_en:"Eau de Parfum Rose",name_fr:"Eau de Parfum Rose",name_ar:"عطر ورد",category:"women",sub_en:"Fragrances",sub_fr:"Parfums",sub_ar:"عطور",price:380,stock:22,image:"https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop",isNew:0},
    {name_en:"Cashmere Cardigan",name_fr:"Cardigan en Cachemire",name_ar:"كارديغان كشمير",category:"children",sub_en:"Clothing",sub_fr:"Vêtements",sub_ar:"ملابس",price:480,stock:10,image:"https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&h=600&fit=crop",isNew:0},
    {name_en:"Mini Leather Sneakers",name_fr:"Baskets Mini Cuir",name_ar:"حذاء رياضي جلدي صغير",category:"children",sub_en:"Shoes",sub_fr:"Chaussures",sub_ar:"أحذية",price:280,stock:16,image:"https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&h=600&fit=crop",isNew:1},
    {name_en:"Kids Silk Bow Tie",name_fr:"Nœud Papillon en Soie Enfant",name_ar:"ربطة عنق حريرية للأطفال",category:"children",sub_en:"Accessories",sub_fr:"Accessoires",sub_ar:"إكسسوارات",price:150,stock:30,image:"https://images.unsplash.com/photo-1602173211822-8347a13dc5ad?w=500&h=600&fit=crop",isNew:1},
    {name_en:"Velvet Party Dress",name_fr:"Robe de Fête en Velours",name_ar:"فستان حفلة مخملي",category:"children",sub_en:"Clothing",sub_fr:"Vêtements",sub_ar:"ملابس",price:650,stock:8,image:"https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&h=600&fit=crop",isNew:1},
  ]
  await supabase.from("products").insert(products)

  const pageContent = [
    {page:"heritage",title:"Our Heritage",title_fr:"Notre Héritage",title_ar:"إرثنا",subtitle:"A craftsmanship passed down through generations",subtitle_fr:"Un savoir-faire transmis de génération en génération",subtitle_ar:"حرفية تنتقل عبر الأجيال",description:"Since 1847, our house has perpetuated French artisanal excellence.",description_fr:"Depuis 1847, notre maison perpétue l'excellence artisanale française.",description_ar:"منذ 1847، ودارنا تواصل التميز الحرفي الفرنسي.",images:'["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"]',published:1},
    {page:"services",title:"Exceptional Service",title_fr:"Service Exceptionnel",title_ar:"خدمة استثنائية",subtitle:"An Experience Beyond Purchase",subtitle_fr:"Une Expérience Au-Delà de l'Achat",subtitle_ar:"تجربة تتجاوز الشراء",description:"From discovery to ownership, every interaction reflects our commitment to excellence.",description_fr:"Chaque interaction reflète notre engagement envers l'excellence.",description_ar:"كل تفاعل يعكس التزامنا بالتميز.",images:'["https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&h=600&fit=crop"]',published:1},
    {page:"boutiques",title:"Our Boutiques",title_fr:"Nos Boutiques",title_ar:"متاجرنا",subtitle:"Experience Luxury Worldwide",subtitle_fr:"Vivez le Luxe dans le Monde Entier",subtitle_ar:"اختبر الفخامة في جميع أنحاء العالم",description:"Discover our boutiques in the world's most prestigious destinations.",description_fr:"Découvrez nos boutiques dans les destinations les plus prestigieuses.",description_ar:"اكتشف متاجرنا في أرقى وجهات العالم.",images:'["https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&h=600&fit=crop"]',published:1},
  ]
  await supabase.from("page_content").insert(pageContent)
}

export async function getProducts(category?: string, sub?: string): Promise<ProductRow[]> {
  await seed()
  let query = supabase.from("products").select("*").order("id")
  if (category) query = query.eq("category", category)
  if (sub) query = query.eq("sub_en", sub)
  const { data: rows } = await query
  return rows || []
}

export async function getProduct(id: number): Promise<ProductRow | null> {
  await seed()
  const { data: row } = await supabase.from("products").select("*").eq("id", id).single()
  return row
}

export async function addProduct(data: Omit<ProductRow, "id" | "createdAt">): Promise<ProductRow> {
  await seed()
  const { data: row } = await supabase.from("products").insert(data).select().single()
  return row!
}

export async function updateProduct(id: number, data: Partial<ProductRow>): Promise<ProductRow | null> {
  await seed()
  const { data: row } = await supabase.from("products").update(data).eq("id", id).select().single()
  return row
}

export async function deleteProduct(id: number) {
  await supabase.from("products").delete().eq("id", id)
}

export async function searchProducts(query: string): Promise<ProductRow[]> {
  await seed()
  const q = `%${query.toLowerCase()}%`
  const { data: rows } = await supabase
    .from("products")
    .select("*")
    .or(`name_en.ilike.${q},name_fr.ilike.${q},name_ar.ilike.${q}`)
    .order("id")
  return rows || []
}

export async function getPageContent(page: string): Promise<PageContentRow | null> {
  await seed()
  const { data: row } = await supabase.from("page_content").select("*").eq("page", page).eq("published", 1).single()
  return row
}

export async function getAllPageContent(): Promise<PageContentRow[]> {
  await seed()
  const { data: rows } = await supabase.from("page_content").select("*").eq("published", 1)
  return rows || []
}

export async function updatePageContent(page: string, data: Partial<PageContentRow>) {
  await seed()
  const { data: existing } = await supabase.from("page_content").select("page").eq("page", page).single()
  if (existing) {
    await supabase.from("page_content").update(data).eq("page", page)
  } else {
    await supabase.from("page_content").insert({ page, title: '', subtitle: '', description: '', images: '[]', published: 1, ...data })
  }
}

export async function getSubscribers(): Promise<SubscriberRow[]> {
  await seed()
  const { data: rows } = await supabase.from("subscribers").select("*").order("id")
  return rows || []
}

export async function addSubscriber(email: string): Promise<boolean> {
  await seed()
  const { data: existing } = await supabase.from("subscribers").select("id").eq("email", email).single()
  if (existing) return false
  await supabase.from("subscribers").insert({ email })
  return true
}

export async function deleteSubscriber(id: number) {
  await supabase.from("subscribers").delete().eq("id", id)
}

export async function getAppointments(): Promise<AppointmentRow[]> {
  await seed()
  const { data: rows } = await supabase.from("appointments").select("*").order("id")
  return rows || []
}

export async function addAppointment(data: Omit<AppointmentRow, "id" | "createdAt">) {
  await seed()
  await supabase.from("appointments").insert(data)
}

export async function updateAppointmentStatus(id: number, status: string) {
  await supabase.from("appointments").update({ status }).eq("id", id)
}

export async function deleteAppointment(id: number) {
  await supabase.from("appointments").delete().eq("id", id)
}

export async function getMessages(): Promise<ContactRow[]> {
  await seed()
  const { data: rows } = await supabase.from("contacts").select("*").order("id")
  return rows || []
}

export async function addMessage(data: Omit<ContactRow, "id" | "createdAt" | "read">) {
  await seed()
  await supabase.from("contacts").insert(data)
}

export async function markAsRead(id: number) {
  await supabase.from("contacts").update({ read: 1 }).eq("id", id)
}

export async function deleteMessage(id: number) {
  await supabase.from("contacts").delete().eq("id", id)
}

export async function getOrders(): Promise<OrderRow[]> {
  await seed()
  const { data: rows } = await supabase.from("orders").select("*").order("createdAt", { ascending: false })
  return rows || []
}

export async function addOrder(data: Omit<OrderRow, "id" | "createdAt" | "status">) {
  await seed()
  const items = JSON.parse(data.items) as { id: number; quantity: number }[]
  for (const item of items) {
    const { data: product } = await supabase.from("products").select("stock").eq("id", item.id).single()
    if (!product || product.stock < item.quantity) throw new Error(`Insufficient stock for product ${item.id}`)
    await supabase.from("products").update({ stock: product.stock - item.quantity }).eq("id", item.id)
  }
  const id = crypto.randomUUID()
  await supabase.from("orders").insert({ ...data, id, status: 'pending' })
}

export async function updateOrderStatus(id: string, status: string) {
  await supabase.from("orders").update({ status }).eq("id", id)
}

export async function createUser(name: string, email: string, password: string) {
  await seed()
  const { data: existing } = await supabase.from("users").select("id").eq("email", email).single()
  if (existing) return null
  const { data: row } = await supabase.from("users").insert({ name, email, password }).select().single()
  return { id: row!.id, name, email }
}

export async function getUserByEmail(email: string): Promise<UserRow | null> {
  await seed()
  const { data: row } = await supabase.from("users").select("*").eq("email", email).single()
  return row
}

export async function getUserById(id: number): Promise<UserRow | null> {
  await seed()
  const { data: row } = await supabase.from("users").select("*").eq("id", id).single()
  return row
}

export async function getAllUsers(): Promise<UserRow[]> {
  await seed()
  const { data: rows } = await supabase.from("users").select("*").order("id", { ascending: false })
  return rows || []
}

export async function deleteUser(id: number) {
  await supabase.from("users").delete().eq("id", id)
}

export async function updateUserName(email: string, name: string) {
  await supabase.from("users").update({ name }).eq("email", email)
}

export async function createResetCode(email: string, code: string, expiresAt: string) {
  await supabase.from("password_resets").insert({ email, code, expires_at: expiresAt })
}

export async function verifyResetCode(email: string, code: string): Promise<boolean> {
  const { data } = await supabase
    .from("password_resets")
    .select("id")
    .eq("email", email)
    .eq("code", code)
    .eq("used", 0)
    .gte("expires_at", new Date().toISOString())
    .single()
  if (!data) return false
  await supabase.from("password_resets").update({ used: 1 }).eq("id", data.id)
  return true
}

export async function updatePassword(email: string, newHash: string) {
  await supabase.from("users").update({ password: newHash }).eq("email", email)
}

// --- Generic JSON collection helpers (store arrays in page_content.description) ---
async function getCollection(name: string): Promise<any[]> {
  const { data } = await supabase.from("page_content").select("description").eq("page", `_${name}`).maybeSingle()
  if (!data?.description) return []
  try { return JSON.parse(data.description) } catch { return [] }
}

async function saveCollection(name: string, items: any[]) {
  const desc = JSON.stringify(items)
  const { data: existing } = await supabase.from("page_content").select("page").eq("page", `_${name}`).maybeSingle()
  if (existing) {
    await supabase.from("page_content").update({ description: desc }).eq("page", `_${name}`)
  } else {
    await supabase.from("page_content").insert({ page: `_${name}`, title: '', subtitle: '', description: desc, images: '[]', published: 1 })
  }
}

// --- Activity Log ---
export interface ActivityLogEntry { id: number; action: string; entityType: string; entityId: string; description: string; adminName: string; createdAt: string }

export async function logActivity(action: string, entityType: string, entityId: string, description: string, adminName: string = "Admin") {
  const logs = await getCollection("activity_log")
  const entry: ActivityLogEntry = { id: Date.now(), action, entityType, entityId, description, adminName, createdAt: new Date().toISOString() }
  logs.unshift(entry)
  if (logs.length > 500) logs.length = 500
  await saveCollection("activity_log", logs)
  return entry
}

export async function getActivityLog(): Promise<ActivityLogEntry[]> {
  return getCollection("activity_log")
}

export async function clearActivityLog() {
  await saveCollection("activity_log", [])
}

// --- Coupons ---
export interface CouponRow { id: number; code: string; discountType: "percentage" | "fixed"; discountValue: number; minOrder: number; maxUses: number; usedCount: number; expiresAt: string; active: number; createdAt: string }

export async function getCoupons(): Promise<CouponRow[]> {
  return getCollection("coupons")
}

export async function addCoupon(data: Omit<CouponRow, "id" | "usedCount" | "createdAt">) {
  const coupons = await getCollection("coupons")
  if (coupons.some((c: CouponRow) => c.code.toUpperCase() === data.code.toUpperCase())) return false
  const coupon: CouponRow = { ...data, id: Date.now(), usedCount: 0, createdAt: new Date().toISOString() }
  coupons.push(coupon)
  await saveCollection("coupons", coupons)
  return true
}

export async function updateCoupon(id: number, data: Partial<CouponRow>) {
  const coupons = await getCollection("coupons")
  const idx = coupons.findIndex((c: CouponRow) => c.id === id)
  if (idx === -1) return
  coupons[idx] = { ...coupons[idx], ...data }
  await saveCollection("coupons", coupons)
}

export async function deleteCoupon(id: number) {
  const coupons = await getCollection("coupons")
  await saveCollection("coupons", coupons.filter((c: CouponRow) => c.id !== id))
}

export async function validateCoupon(code: string, orderTotal: number): Promise<{ valid: boolean; discount?: number; message?: string }> {
  const coupons = await getCollection("coupons")
  const coupon = coupons.find((c: CouponRow) => c.code.toUpperCase() === code.toUpperCase() && c.active === 1)
  if (!coupon) return { valid: false, message: "Invalid coupon code" }
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) return { valid: false, message: "Coupon has expired" }
  if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses) return { valid: false, message: "Coupon has reached max uses" }
  if (orderTotal < coupon.minOrder) return { valid: false, message: `Minimum order amount is $${coupon.minOrder}` }
  const discount = coupon.discountType === "percentage" ? (orderTotal * coupon.discountValue) / 100 : coupon.discountValue
  return { valid: true, discount: Math.min(discount, orderTotal) }
}

export async function useCoupon(code: string) {
  const coupons = await getCollection("coupons")
  const idx = coupons.findIndex((c: CouponRow) => c.code.toUpperCase() === code.toUpperCase())
  if (idx !== -1) {
    coupons[idx].usedCount++
    await saveCollection("coupons", coupons)
  }
}

// --- Reviews ---
export interface ReviewRow { id: number; productId: number; userName: string; userEmail: string; rating: number; comment: string; approved: number; createdAt: string }

export async function getReviews(productId?: number): Promise<ReviewRow[]> {
  const reviews = await getCollection("reviews")
  if (productId) return reviews.filter((r: ReviewRow) => r.productId === productId)
  return reviews
}

export async function addReview(data: Omit<ReviewRow, "id" | "approved" | "createdAt">) {
  const reviews = await getCollection("reviews")
  const review: ReviewRow = { ...data, id: Date.now(), approved: 0, createdAt: new Date().toISOString() }
  reviews.unshift(review)
  await saveCollection("reviews", reviews)
  return review
}

export async function approveReview(id: number) {
  const reviews = await getCollection("reviews")
  const idx = reviews.findIndex((r: ReviewRow) => r.id === id)
  if (idx !== -1) { reviews[idx].approved = 1; await saveCollection("reviews", reviews) }
}

export async function deleteReview(id: number) {
  const reviews = await getCollection("reviews")
  await saveCollection("reviews", reviews.filter((r: ReviewRow) => r.id !== id))
}

// --- Settings ---
export interface SettingsRow { storeName: string; currency: string; emailNotifications: number; defaultLanguage: string; maintenanceMode: number }

export async function getSettings(): Promise<SettingsRow> {
  const items = await getCollection("settings")
  if (items.length === 0) return { storeName: "MAISON HERAHIMA", currency: "DZD", emailNotifications: 0, defaultLanguage: "en", maintenanceMode: 0 }
  return items[0]
}

export async function updateSettings(data: Partial<SettingsRow>) {
  let settings = await getCollection("settings")
  if (settings.length === 0) settings = [{ storeName: "MAISON HERAHIMA", currency: "DZD", emailNotifications: 0, defaultLanguage: "en", maintenanceMode: 0 }]
  Object.assign(settings[0], data)
  await saveCollection("settings", settings)
}

// --- Analytics (derived from orders) ---
export async function getRevenueAnalytics() {
  await seed()
  const orders = await getOrders()
  const now = new Date()
  const thisMonth = now.getMonth()
  const thisYear = now.getFullYear()

  const totalRevenue = orders.reduce((s, o) => s + o.grandTotal, 0)
  const totalOrders = orders.length
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  const monthlyRevenue: { month: string; revenue: number; orders: number }[] = []
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  for (let m = 0; m < 12; m++) {
    const monthOrders = orders.filter(o => {
      const d = new Date(o.createdAt)
      return d.getMonth() === m && d.getFullYear() === thisYear
    })
    monthlyRevenue.push({ month: months[m], revenue: monthOrders.reduce((s, o) => s + o.grandTotal, 0), orders: monthOrders.length })
  }

  const recentOrders = orders.slice(0, 5)

  const ordersByStatus = {
    pending: orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  }

  const ordersToday = orders.filter(o => {
    const d = new Date(o.createdAt)
    return d.getDate() === now.getDate() && d.getMonth() === thisMonth && d.getFullYear() === thisYear
  })

  return { totalRevenue, totalOrders, avgOrderValue, monthlyRevenue, recentOrders, ordersByStatus, ordersToday: ordersToday.length, revenueToday: ordersToday.reduce((s, o) => s + o.grandTotal, 0) }
}

export async function getStats() {
  await seed()
  const { count: totalSubscribers } = await supabase.from("subscribers").select("*", { count: "exact", head: true })
  const { count: pendingAppointments } = await supabase.from("appointments").select("*", { count: "exact", head: true }).eq("status", "pending")
  const { count: unreadMessages } = await supabase.from("contacts").select("*", { count: "exact", head: true }).eq("read", 0)
  const { count: totalAppointments } = await supabase.from("appointments").select("*", { count: "exact", head: true })
  const { count: totalOrders } = await supabase.from("orders").select("*", { count: "exact", head: true })
  const { count: pendingOrders } = await supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending")
  return {
    totalSubscribers: totalSubscribers || 0,
    pendingAppointments: pendingAppointments || 0,
    unreadMessages: unreadMessages || 0,
    totalAppointments: totalAppointments || 0,
    totalOrders: totalOrders || 0,
    pendingOrders: pendingOrders || 0,
  }
}

export async function getProductsCount(): Promise<number> {
  await seed()
  const { count } = await supabase.from("products").select("*", { count: "exact", head: true })
  return count || 0
}

export async function getCategories(): Promise<string[]> {
  await seed()
  const { data: rows } = await supabase.from("products").select("category")
  return [...new Set((rows || []).map(p => p.category))]
}
