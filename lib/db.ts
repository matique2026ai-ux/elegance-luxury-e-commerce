// In-memory data store — no native modules, no WASM, works everywhere

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

let products: ProductRow[] = []
let pageContent: PageContentRow[] = []
let subscribers: SubscriberRow[] = []
let appointments: AppointmentRow[] = []
let contacts: ContactRow[] = []
let users: UserRow[] = []
let orders: OrderRow[] = []
let initialized = false

function seed() {
  if (initialized) return
  initialized = true
  products = [
    {id:1,name_en:"Wool Tailored Suit",name_fr:"Costume en Laine Sur Mesure",name_ar:"بدلة صوف مفصلة",category:"men",sub_en:"Clothing",sub_fr:"Vêtements",sub_ar:"ملابس",price:3200,stock:10,image:"https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop",isNew:1,createdAt:new Date().toISOString()},
    {id:2,name_en:"Linen Blazer",name_fr:"Blazer en Lin",name_ar:"بليزر كتان",category:"men",sub_en:"Clothing",sub_fr:"Vêtements",sub_ar:"ملابس",price:1800,stock:8,image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",isNew:0,createdAt:new Date().toISOString()},
    {id:3,name_en:"Leather Oxford Shoes",name_fr:"Chaussures Oxford en Cuir",name_ar:"أحذية أوكسفورد جلدية",category:"men",sub_en:"Shoes",sub_fr:"Chaussures",sub_ar:"أحذية",price:1450,stock:15,image:"https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&h=600&fit=crop",isNew:0,createdAt:new Date().toISOString()},
    {id:4,name_en:"Cashmere Scarf",name_fr:"Écharpe en Cachemire",name_ar:"وشاح كشمير",category:"men",sub_en:"Accessories",sub_fr:"Accessoires",sub_ar:"إكسسوارات",price:680,stock:20,image:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=600&fit=crop",isNew:1,createdAt:new Date().toISOString()},
    {id:5,name_en:"Eau de Parfum",name_fr:"Eau de Parfum",name_ar:"عطر",category:"men",sub_en:"Fragrances",sub_fr:"Parfums",sub_ar:"عطور",price:320,stock:25,image:"https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop",isNew:1,createdAt:new Date().toISOString()},
    {id:6,name_en:"Silk Evening Gown",name_fr:"Robe du Soir en Soie",name_ar:"فستان سهرة حريري",category:"women",sub_en:"Clothing",sub_fr:"Vêtements",sub_ar:"ملابس",price:8750,stock:5,image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",isNew:1,createdAt:new Date().toISOString()},
    {id:7,name_en:"Pearl Necklace",name_fr:"Collier de Perles",name_ar:"عقد لؤلؤ",category:"women",sub_en:"Accessories",sub_fr:"Accessoires",sub_ar:"إكسسوارات",price:4890,stock:7,image:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop",isNew:1,createdAt:new Date().toISOString()},
    {id:8,name_en:"Leather Duchess Bag",name_fr:"Sac Duchesse en Cuir",name_ar:"حقيبة دوقة جلدية",category:"women",sub_en:"Accessories",sub_fr:"Accessoires",sub_ar:"إكسسوارات",price:2450,stock:12,image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop",isNew:0,createdAt:new Date().toISOString()},
    {id:9,name_en:"Floral Summer Dress",name_fr:"Robe d'Été Fleurie",name_ar:"فستان صيفي مزهر",category:"women",sub_en:"Clothing",sub_fr:"Vêtements",sub_ar:"ملابس",price:1200,stock:14,image:"https://images.unsplash.com/photo-1572804013309-59a88b7e92b1?w=500&h=600&fit=crop",isNew:0,createdAt:new Date().toISOString()},
    {id:10,name_en:"Sapphire Ring",name_fr:"Bague Saphir",name_ar:"خاتم ياقوت أزرق",category:"women",sub_en:"Accessories",sub_fr:"Accessoires",sub_ar:"إكسسوارات",price:12500,stock:3,image:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=600&fit=crop",isNew:0,createdAt:new Date().toISOString()},
    {id:11,name_en:"Stiletto Heels",name_fr:"Talons Aiguilles",name_ar:"كعب عالي",category:"women",sub_en:"Shoes",sub_fr:"Chaussures",sub_ar:"أحذية",price:980,stock:18,image:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop",isNew:1,createdAt:new Date().toISOString()},
    {id:12,name_en:"Eau de Parfum Rose",name_fr:"Eau de Parfum Rose",name_ar:"عطر ورد",category:"women",sub_en:"Fragrances",sub_fr:"Parfums",sub_ar:"عطور",price:380,stock:22,image:"https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop",isNew:0,createdAt:new Date().toISOString()},
    {id:13,name_en:"Cashmere Cardigan",name_fr:"Cardigan en Cachemire",name_ar:"كارديغان كشمير",category:"children",sub_en:"Clothing",sub_fr:"Vêtements",sub_ar:"ملابس",price:480,stock:10,image:"https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&h=600&fit=crop",isNew:0,createdAt:new Date().toISOString()},
    {id:14,name_en:"Mini Leather Sneakers",name_fr:"Baskets Mini Cuir",name_ar:"حذاء رياضي جلدي صغير",category:"children",sub_en:"Shoes",sub_fr:"Chaussures",sub_ar:"أحذية",price:280,stock:16,image:"https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&h=600&fit=crop",isNew:1,createdAt:new Date().toISOString()},
    {id:15,name_en:"Kids Silk Bow Tie",name_fr:"Nœud Papillon en Soie Enfant",name_ar:"ربطة عنق حريرية للأطفال",category:"children",sub_en:"Accessories",sub_fr:"Accessoires",sub_ar:"إكسسوارات",price:150,stock:30,image:"https://images.unsplash.com/photo-1602173211822-8347a13dc5ad?w=500&h=600&fit=crop",isNew:1,createdAt:new Date().toISOString()},
    {id:16,name_en:"Velvet Party Dress",name_fr:"Robe de Fête en Velours",name_ar:"فستان حفلة مخملي",category:"children",sub_en:"Clothing",sub_fr:"Vêtements",sub_ar:"ملابس",price:650,stock:8,image:"https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&h=600&fit=crop",isNew:1,createdAt:new Date().toISOString()},
  ]
  pageContent = [
    {page:"heritage",title:"Our Heritage",title_fr:"Notre Héritage",title_ar:"إرثنا",subtitle:"A craftsmanship passed down through generations",subtitle_fr:"Un savoir-faire transmis de génération en génération",subtitle_ar:"حرفية تنتقل عبر الأجيال",description:"Since 1847, our house has perpetuated French artisanal excellence. Each piece is the result of a dialogue between tradition and modernity.",description_fr:"Depuis 1847, notre maison perpétue l'excellence artisanale française. Chaque pièce est le fruit d'un dialogue entre tradition et modernité.",description_ar:"منذ 1847، ودارنا تواصل التميز الحرفي الفرنسي. كل قطعة هي نتاج حوار بين التقاليد والحداثة.",images:'["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"]',published:1},
    {page:"services",title:"Exceptional Service",title_fr:"Service Exceptionnel",title_ar:"خدمة استثنائية",subtitle:"An Experience Beyond Purchase",subtitle_fr:"Une Expérience Au-Delà de l'Achat",subtitle_ar:"تجربة تتجاوز الشراء",description:"From the moment you discover our pieces to years of ownership, we ensure every interaction reflects our commitment to excellence.",description_fr:"Du moment où vous découvrez nos pièces jusqu'à des années après, chaque interaction reflète notre engagement envers l'excellence.",description_ar:"من لحظة اكتشافك لقطعنا إلى سنوات من الاقتناء، نضمن أن كل تفاعل يعكس التزامنا بالتميز.",images:'["https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&h=600&fit=crop"]',published:1},
    {page:"boutiques",title:"Our Boutiques",title_fr:"Nos Boutiques",title_ar:"متاجرنا",subtitle:"Experience Luxury Worldwide",subtitle_fr:"Vivez le Luxe dans le Monde Entier",subtitle_ar:"اختبر الفخامة في جميع أنحاء العالم",description:"Discover our boutiques in the world's most prestigious destinations.",description_fr:"Découvrez nos boutiques dans les destinations les plus prestigieuses du monde.",description_ar:"اكتشف متاجرنا في أرقى وجهات العالم.",images:'["https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&h=600&fit=crop"]',published:1},
  ]
}

export function getProducts(category?: string, sub?: string): ProductRow[] {
  seed()
  let result = products
  if (category) result = result.filter(p => p.category === category)
  if (sub) result = result.filter(p => p.sub_en === sub)
  return result
}

export function getProduct(id: number): ProductRow | undefined {
  seed()
  return products.find(p => p.id === id)
}

export function addProduct(data: Omit<ProductRow, "id" | "createdAt">) {
  seed()
  const id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1
  const row: ProductRow = { ...data, id, createdAt: new Date().toISOString() }
  products.push(row)
  return row
}

export function updateProduct(id: number, data: Partial<ProductRow>) {
  seed()
  const idx = products.findIndex(p => p.id === id)
  if (idx === -1) return null
  products[idx] = { ...products[idx], ...data }
  return products[idx]
}

export function deleteProduct(id: number) {
  seed()
  products = products.filter(p => p.id !== id)
}

export function searchProducts(query: string): ProductRow[] {
  seed()
  const q = query.toLowerCase()
  return products.filter(p => p.name_en.toLowerCase().includes(q) || (p.name_fr || '').toLowerCase().includes(q) || (p.name_ar || '').toLowerCase().includes(q))
}

export function getPageContent(page: string): PageContentRow | undefined {
  seed()
  return pageContent.find(c => c.page === page && c.published === 1)
}

export function getAllPageContent(): PageContentRow[] {
  seed()
  return pageContent.filter(c => c.published === 1)
}

export function updatePageContent(page: string, data: Partial<PageContentRow>) {
  seed()
  const idx = pageContent.findIndex(c => c.page === page)
  if (idx >= 0) pageContent[idx] = { ...pageContent[idx], ...data }
  else pageContent.push({ page, title: '', subtitle: '', description: '', images: '[]', published: 1, ...data })
}

export function getSubscribers() { seed(); return subscribers }
export function addSubscriber(email: string) { seed(); if (subscribers.find(s => s.email === email)) return false; subscribers.push({ id: subscribers.length + 1, email, date: new Date().toISOString() }); return true }
export function deleteSubscriber(id: number) { seed(); subscribers = subscribers.filter(s => s.id !== id) }
export function getAppointments() { seed(); return appointments }
export function addAppointment(data: Omit<AppointmentRow, "id" | "createdAt">) { seed(); appointments.push({ ...data, id: appointments.length + 1, createdAt: new Date().toISOString() }) }
export function updateAppointmentStatus(id: number, status: string) { seed(); const a = appointments.find(a => a.id === id); if (a) a.status = status }
export function deleteAppointment(id: number) { seed(); appointments = appointments.filter(a => a.id !== id) }
export function getMessages() { seed(); return contacts }
export function addMessage(data: Omit<ContactRow, "id" | "createdAt" | "read">) { seed(); contacts.push({ ...data, id: contacts.length + 1, createdAt: new Date().toISOString(), read: 0 }) }
export function markAsRead(id: number) { seed(); const c = contacts.find(c => c.id === id); if (c) c.read = 1 }
export function deleteMessage(id: number) { seed(); contacts = contacts.filter(c => c.id !== id) }
export function getOrders() { seed(); return orders }
export function addOrder(data: Omit<OrderRow, "id" | "createdAt" | "status">) {
  seed()
  const id = crypto.randomUUID()
  for (const item of JSON.parse(data.items) as { id: number; quantity: number }[]) {
    const p = products.find(p => p.id === item.id)
    if (!p) throw new Error(`Product ${item.id} not found`)
    if (p.stock < item.quantity) throw new Error(`Insufficient stock for product ${item.id}`)
    p.stock -= item.quantity
  }
  orders.push({ ...data, id, createdAt: new Date().toISOString(), status: 'pending' })
}
export function updateOrderStatus(id: string, status: string) { seed(); const o = orders.find(o => o.id === id); if (o) o.status = status }
export function createUser(name: string, email: string, password: string) { seed(); if (users.find(u => u.email === email)) return null; const u: UserRow = { id: users.length + 1, name, email, password, createdAt: new Date().toISOString() }; users.push(u); return { id: u.id, name, email } }
export function getUserByEmail(email: string) { seed(); return users.find(u => u.email === email) }
export function getUserById(id: number) { seed(); return users.find(u => u.id === id) }
export function getStats() {
  seed()
  return {
    totalSubscribers: subscribers.length,
    pendingAppointments: appointments.filter(a => a.status === 'pending').length,
    unreadMessages: contacts.filter(c => !c.read).length,
    totalAppointments: appointments.length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
  }
}
export function getProductsCount() { seed(); return products.length }
export function getCategories() { seed(); return [...new Set(products.map(p => p.category))] }