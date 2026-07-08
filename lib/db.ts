import Database from "better-sqlite3"
import path from "path"
import fs from "fs"

const dbPath = path.join(process.cwd(), "data", "store.db")

let db: Database.Database | null = null

export function getDb() {
  if (db) return db

  const dir = path.dirname(dbPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  db = new Database(dbPath)
  db.pragma("journal_mode = WAL")
  db.pragma("foreign_keys = ON")
  initSchema()
  seedData()
  return db
}

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_en TEXT NOT NULL,
      name_fr TEXT,
      name_ar TEXT,
      category TEXT NOT NULL,
      sub_en TEXT NOT NULL,
      sub_fr TEXT,
      sub_ar TEXT,
      price REAL NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      image TEXT,
      isNew INTEGER NOT NULL DEFAULT 1,
      createdAt TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      date TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      date TEXT,
      message TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      status TEXT DEFAULT 'pending'
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      createdAt TEXT DEFAULT (datetime('now')),
      read INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS page_content (
      page TEXT PRIMARY KEY,
      title TEXT,
      subtitle TEXT,
      description TEXT,
      images TEXT,
      published INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      createdAt TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      items TEXT NOT NULL,
      total REAL NOT NULL,
      shippingPrice REAL NOT NULL,
      grandTotal REAL NOT NULL,
      customer TEXT NOT NULL,
      createdAt TEXT DEFAULT (datetime('now')),
      status TEXT DEFAULT 'pending'
    );
  `)

  // Migrate: add multilingual columns to page_content if missing
  const cols = ["title_fr", "title_ar", "subtitle_fr", "subtitle_ar", "description_fr", "description_ar"]
  for (const col of cols) {
    try {
      db.exec(`ALTER TABLE page_content ADD COLUMN ${col} TEXT`)
    } catch { /* column already exists */ }
  }

  // Update existing page_content with localized seed data
  const existing = db.prepare("SELECT COUNT(*) as c FROM page_content WHERE title_fr IS NOT NULL").get() as { c: number }
  if (existing.c === 0) {
    db.prepare("UPDATE page_content SET title_fr = 'Notre Héritage', title_ar = 'إرثنا', subtitle_fr = 'Un savoir-faire transmis de génération en génération', subtitle_ar = 'حرفية تنتقل عبر الأجيال', description_fr = 'Depuis 1847, notre maison perpétue l''excellence artisanale française.', description_ar = 'منذ 1847، ودارنا تواصل التميز الحرفي الفرنسي.' WHERE page = 'heritage'").run()
    db.prepare("UPDATE page_content SET title_fr = 'Service Exceptionnel', title_ar = 'خدمة استثنائية', subtitle_fr = 'Une Expérience Au-Delà de l''Achat', subtitle_ar = 'تجربة تتجاوز الشراء', description_fr = 'Du moment où vous découvrez nos pièces jusqu''à des années après.', description_ar = 'من لحظة اكتشافك لقطعنا إلى سنوات من الاقتناء.' WHERE page = 'services'").run()
    db.prepare("UPDATE page_content SET title_fr = 'Nos Boutiques', title_ar = 'متاجرنا', subtitle_fr = 'Vivez le Luxe dans le Monde Entier', subtitle_ar = 'اختبر الفخامة في جميع أنحاء العالم', description_fr = 'Découvrez nos boutiques dans les destinations les plus prestigieuses du monde.', description_ar = 'اكتشف متاجرنا في أرقى وجهات العالم.' WHERE page = 'boutiques'").run()
  }
}

function seedData() {
  const count = db.prepare("SELECT COUNT(*) as c FROM products").get() as { c: number }
  if (count.c > 0) return

  const insert = db.prepare(`INSERT INTO products (name_en, name_fr, name_ar, category, sub_en, sub_fr, sub_ar, price, stock, image, isNew) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)

  const products = [
    ["Wool Tailored Suit", "Costume en Laine Sur Mesure", "بدلة صوف مفصلة", "men", "Clothing", "Vêtements", "ملابس", 3200, 10, "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop", 1],
    ["Linen Blazer", "Blazer en Lin", "بليزر كتان", "men", "Clothing", "Vêtements", "ملابس", 1800, 8, "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop", 0],
    ["Leather Oxford Shoes", "Chaussures Oxford en Cuir", "أحذية أوكسفورد جلدية", "men", "Shoes", "Chaussures", "أحذية", 1450, 15, "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&h=600&fit=crop", 0],
    ["Cashmere Scarf", "Écharpe en Cachemire", "وشاح كشمير", "men", "Accessories", "Accessoires", "إكسسوارات", 680, 20, "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=600&fit=crop", 1],
    ["Eau de Parfum", "Eau de Parfum", "عطر", "men", "Fragrances", "Parfums", "عطور", 320, 25, "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop", 1],
    ["Silk Evening Gown", "Robe du Soir en Soie", "فستان سهرة حريري", "women", "Clothing", "Vêtements", "ملابس", 8750, 5, "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop", 1],
    ["Pearl Necklace", "Collier de Perles", "عقد لؤلؤ", "women", "Accessories", "Accessoires", "إكسسوارات", 4890, 7, "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop", 1],
    ["Leather Duchess Bag", "Sac Duchesse en Cuir", "حقيبة دوقة جلدية", "women", "Accessories", "Accessoires", "إكسسوارات", 2450, 12, "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop", 0],
    ["Floral Summer Dress", "Robe d'Été Fleurie", "فستان صيفي مزهر", "women", "Clothing", "Vêtements", "ملابس", 1200, 14, "https://images.unsplash.com/photo-1572804013309-59a88b7e92b1?w=500&h=600&fit=crop", 0],
    ["Sapphire Ring", "Bague Saphir", "خاتم ياقوت أزرق", "women", "Accessories", "Accessoires", "إكسسوارات", 12500, 3, "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=600&fit=crop", 0],
    ["Stiletto Heels", "Talons Aiguilles", "كعب عالي", "women", "Shoes", "Chaussures", "أحذية", 980, 18, "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop", 1],
    ["Eau de Parfum Rose", "Eau de Parfum Rose", "عطر ورد", "women", "Fragrances", "Parfums", "عطور", 380, 22, "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop", 0],
    ["Cashmere Cardigan", "Cardigan en Cachemire", "كارديغان كشمير", "children", "Clothing", "Vêtements", "ملابس", 480, 10, "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&h=600&fit=crop", 0],
    ["Mini Leather Sneakers", "Baskets Mini Cuir", "حذاء رياضي جلدي صغير", "children", "Shoes", "Chaussures", "أحذية", 280, 16, "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&h=600&fit=crop", 1],
    ["Kids Silk Bow Tie", "Nœud Papillon en Soie Enfant", "ربطة عنق حريرية للأطفال", "children", "Accessories", "Accessoires", "إكسسوارات", 150, 30, "https://images.unsplash.com/photo-1602173211822-8347a13dc5ad?w=500&h=600&fit=crop", 1],
    ["Velvet Party Dress", "Robe de Fête en Velours", "فستان حفلة مخملي", "children", "Clothing", "Vêtements", "ملابس", 650, 8, "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&h=600&fit=crop", 1],
  ]

  const seedContent = db.prepare(`INSERT OR IGNORE INTO page_content (page, title, title_fr, title_ar, subtitle, subtitle_fr, subtitle_ar, description, description_fr, description_ar, images, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)

  const pages = [
    ["heritage", "Our Heritage", "Notre Héritage", "إرثنا", "A craftsmanship passed down through generations", "Un savoir-faire transmis de génération en génération", "حرفية تنتقل عبر الأجيال", "Since 1847, our house has perpetuated French artisanal excellence. Each piece is the result of a dialogue between tradition and modernity.", "Depuis 1847, notre maison perpétue l'excellence artisanale française. Chaque pièce est le fruit d'un dialogue entre tradition et modernité.", "منذ 1847، ودارنا تواصل التميز الحرفي الفرنسي. كل قطعة هي نتاج حوار بين التقاليد والحداثة.", '["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"]', 1],
    ["services", "Exceptional Service", "Service Exceptionnel", "خدمة استثنائية", "An Experience Beyond Purchase", "Une Expérience Au-Delà de l'Achat", "تجربة تتجاوز الشراء", "From the moment you discover our pieces to years of ownership, we ensure every interaction reflects our commitment to excellence.", "Du moment où vous découvrez nos pièces jusqu'à des années après, chaque interaction reflète notre engagement envers l'excellence.", "من لحظة اكتشافك لقطعنا إلى سنوات من الاقتناء، نضمن أن كل تفاعل يعكس التزامنا بالتميز.", '["https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&h=600&fit=crop"]', 1],
    ["boutiques", "Our Boutiques", "Nos Boutiques", "متاجرنا", "Experience Luxury Worldwide", "Vivez le Luxe dans le Monde Entier", "اختبر الفخامة في جميع أنحاء العالم", "Discover our boutiques in the world's most prestigious destinations.", "Découvrez nos boutiques dans les destinations les plus prestigieuses du monde.", "اكتشف متاجرنا في أرقى وجهات العالم.", '["https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&h=600&fit=crop"]', 1],
  ]

  const tx = db.transaction(() => {
    for (const p of products) {
      insert.run(...p)
    }
    for (const c of pages) {
      seedContent.run(...c)
    }
  })

  tx()
}
