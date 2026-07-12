"use client"

import { useEffect, useState } from "react"
import { Save } from "lucide-react"

export default function SettingsPage() {
  const [form, setForm] = useState({ storeName: "", currency: "DZD", emailNotifications: false, defaultLanguage: "en", maintenanceMode: false })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(s => setForm({
      storeName: s.storeName || "MAISON HERAHIMA",
      currency: s.currency || "DZD",
      emailNotifications: s.emailNotifications === 1,
      defaultLanguage: s.defaultLanguage || "en",
      maintenanceMode: s.maintenanceMode === 1,
    }))
  }, [])

  async function save() {
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      storeName: form.storeName,
      currency: form.currency,
      emailNotifications: form.emailNotifications ? 1 : 0,
      defaultLanguage: form.defaultLanguage,
      maintenanceMode: form.maintenanceMode ? 1 : 0,
    })})
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">Settings</h1>
        <button type="button" onClick={save} className="px-4 py-2 bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
          <Save className="w-4 h-4" /> {saved ? "Saved!" : "Save"}
        </button>
      </div>

      <div className="grid gap-8 max-w-2xl">
        <div className="bg-card border border-border p-6">
          <h2 className="font-serif text-lg mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Store Name</label>
              <input value={form.storeName} onChange={e => setForm({ ...form, storeName: e.target.value })} className="w-full px-3 py-2 bg-background border border-border text-sm" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Currency</label>
              <select value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })} className="w-full px-3 py-2 bg-background border border-border text-sm">
                <option value="DZD">DZD (Algerian Dinar)</option>
                <option value="EUR">EUR (Euro)</option>
                <option value="USD">USD (US Dollar)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Default Language</label>
              <select value={form.defaultLanguage} onChange={e => setForm({ ...form, defaultLanguage: e.target.value })} className="w-full px-3 py-2 bg-background border border-border text-sm">
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border p-6">
          <h2 className="font-serif text-lg mb-4">Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.emailNotifications} onChange={e => setForm({ ...form, emailNotifications: e.target.checked })} className="accent-primary" />
              <div>
                <p className="text-sm font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive email alerts for new orders and messages</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.maintenanceMode} onChange={e => setForm({ ...form, maintenanceMode: e.target.checked })} className="accent-primary" />
              <div>
                <p className="text-sm font-medium">Maintenance Mode</p>
                <p className="text-xs text-muted-foreground">Hide store from customers during maintenance</p>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-card border border-border p-6">
          <h2 className="font-serif text-lg mb-4">Database</h2>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Some features use JSON-based storage in <code className="bg-secondary/50 px-1">page_content</code> table.</p>
            <p>For production, run the following SQL in your Supabase dashboard to create dedicated tables:</p>
            <pre className="bg-background p-4 text-xs overflow-x-auto mt-2 border border-border">
{`CREATE TABLE IF NOT EXISTS activity_log (
  id BIGINT PRIMARY KEY, action TEXT, entity_type TEXT,
  entity_id TEXT, description TEXT, admin_name TEXT, created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS coupons (
  id BIGINT PRIMARY KEY, code TEXT UNIQUE, discount_type TEXT,
  discount_value REAL, min_order REAL, max_uses INT, used_count INT DEFAULT 0,
  expires_at TIMESTAMPTZ, active INT DEFAULT 1, created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS reviews (
  id BIGINT PRIMARY KEY, product_id INT, user_name TEXT, user_email TEXT,
  rating INT, comment TEXT, approved INT DEFAULT 0, created_at TIMESTAMPTZ DEFAULT NOW()
);`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
