"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Calendar, Mail, Users, ShoppingBag, ChevronLeft, FileText } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

const sidebarIcons = {
  overview: LayoutDashboard,
  orders: ShoppingBag,
  products: Package,
  content: FileText,
  appointments: Calendar,
  messages: Mail,
  subscribers: Users,
} as const

const sidebarItems = ["overview", "orders", "products", "content", "appointments", "messages", "subscribers"] as const

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { t } = useI18n()
  const d = t.dashboard

  return (
    <div className="min-h-screen bg-secondary/20 flex">
      <aside className="w-64 bg-primary text-primary-foreground flex flex-col shrink-0">
        <div className="p-6 border-b border-primary-foreground/20">
          <Link href="/" className="font-serif text-lg tracking-[0.15em]">
            MAISON
            <span className="block text-[0.6em] tracking-[0.3em] text-primary-foreground/60">HERAHIMA</span>
          </Link>
          <p className="text-[10px] tracking-[0.3em] uppercase text-primary-foreground/40 mt-2">{d.nav.dashboard}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((key) => {
            const href = key === "overview" ? "/dashboard" : `/dashboard/${key}`
            const Icon = sidebarIcons[key]
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
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

        <div className="p-4 border-t border-primary-foreground/20">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-sm tracking-wider text-primary-foreground/70 hover:bg-primary-foreground/10 transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            {d.nav.backToSite}
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
