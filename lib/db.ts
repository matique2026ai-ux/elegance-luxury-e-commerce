import { supabase } from "./supabase"

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
export interface OrderRow { id: string; items: string; total: number; shippingPrice: number; grandTotal: number; customer: string; createdAt: string; status: string }

async function seed() {
  const { count } = await supabase.from("products").select("*", { count: "exact", head: true })
  if (count && count > 0) return

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
