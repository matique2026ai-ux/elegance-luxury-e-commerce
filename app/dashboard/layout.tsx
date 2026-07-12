"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Package, Calendar, Mail, Users, ShoppingBag, ChevronLeft, FileText, LogOut, Globe, Menu, X, UserCircle, BarChart3, Clock, Tag, Star, Settings as SettingsIcon } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

const sidebarIcons = {
  overview: LayoutDashboard,
  analytics: BarChart3,
  orders: ShoppingBag,
  products: Package,
  content: FileText,
  appointments: Calendar,
  messages: Mail,
  subscribers: Users,
  users: UserCircle,
  activity: Clock,
  coupons: Tag,
  reviews: Star,
  settings: SettingsIcon,
} as const

const sidebarItems = ["overview", "analytics", "orders", "products", "content", "appointments", "messages", "subscribers", "users", "activity", "coupons", "reviews", "settings"] as const

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { t, lang, setLang } = useI18n()
  const d = t.dashboard
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetch("/api/auth").then(r => {
      if (r.ok) setAuthed(true)
      else router.replace("/dashboard/login")
    }).catch(() => router.replace("/dashboard/login"))
    .finally(() => setChecking(false))
  }, [router])

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/dashboard/login")
  }

  function closeSidebar() { setSidebarOpen(false) }

  if (pathname === "/dashboard/login") return <>{children}</>
  if (checking || !authed) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>

  return (
    <div className="min-h-screen bg-secondary/20 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeSidebar} />
      )}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground flex flex-col shrink-0 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b border-primary-foreground/20 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="MAISON HERAHIMA" width={140} height={44} className="h-10 w-auto brightness-0 invert" priority />
          </Link>
          <button onClick={closeSidebar} className="lg:hidden p-1 hover:text-primary-foreground/60"><X className="w-5 h-5" /></button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((key) => {
            const href = key === "overview" ? "/dashboard" : `/dashboard/${key}`
            const Icon = sidebarIcons[key]
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 text-sm tracking-wider transition-all duration-200 ${
                  active ? "bg-accent text-accent-foreground" : "text-primary-foreground/70 hover:bg-primary-foreground/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {d.nav[key]}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-primary-foreground/20 space-y-1">
          <div className="flex items-center gap-1 px-3 py-2">
            <Globe className="w-3 h-3 text-primary-foreground/50" />
            {([["EN", "en"], ["FR", "fr"], ["AR", "ar"]] as const).map(([label, code]) => (
              <button key={code} onClick={() => setLang(code)} className={`text-[11px] tracking-wider px-2 py-1 uppercase transition-colors ${lang === code ? "bg-accent text-accent-foreground" : "text-primary-foreground/60 hover:text-primary-foreground"}`}>
                {label}
              </button>
            ))}
          </div>
          <Link
            href="/"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 text-sm tracking-wider text-primary-foreground/70 hover:bg-primary-foreground/10 transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            {d.nav.backToSite}
          </Link>
          <button
            onClick={() => { handleLogout(); closeSidebar() }}
            className="flex items-center gap-3 px-4 py-3 w-full text-sm tracking-wider text-primary-foreground/70 hover:bg-primary-foreground/10 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-auto">
        <div className="sticky top-0 z-30 lg:hidden bg-background/80 backdrop-blur-md border-b border-border flex items-center gap-3 px-4 h-12">
          <button onClick={() => setSidebarOpen(true)} className="p-1 hover:text-accent"><Menu className="w-5 h-5" /></button>
          <span className="text-xs tracking-wider uppercase text-muted-foreground">MAISON HERAHIMA / {d.nav.dashboard}</span>
        </div>
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
