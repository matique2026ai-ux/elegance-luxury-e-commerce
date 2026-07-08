"use client"

import { Heart, ShoppingBag, User, MapPin, LogOut } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"

export default function AccountPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-24">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-12">{t.header.account}</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/favorites" className="bg-card border border-border p-8 text-center hover:bg-secondary/50 transition-colors group">
              <Heart className="w-8 h-8 mx-auto mb-4 group-hover:text-accent transition-colors" />
              <h3 className="font-serif text-xl mb-1">Favorites</h3>
              <p className="text-sm text-muted-foreground">View your wishlist</p>
            </Link>
            <Link href="/checkout" className="bg-card border border-border p-8 text-center hover:bg-secondary/50 transition-colors group">
              <ShoppingBag className="w-8 h-8 mx-auto mb-4 group-hover:text-accent transition-colors" />
              <h3 className="font-serif text-xl mb-1">Orders</h3>
              <p className="text-sm text-muted-foreground">View your orders</p>
            </Link>
            <div className="bg-card border border-border p-8 text-center opacity-50">
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-1">Addresses</h3>
              <p className="text-sm text-muted-foreground">Manage your addresses</p>
            </div>
            <div className="bg-card border border-border p-8 text-center opacity-50">
              <User className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-1">Profile</h3>
              <p className="text-sm text-muted-foreground">Edit your profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
