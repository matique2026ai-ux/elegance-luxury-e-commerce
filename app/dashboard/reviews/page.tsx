"use client"

import { useEffect, useState } from "react"
import { Trash2, RefreshCw, Star, Check, X } from "lucide-react"

interface Review {
  id: number
  productId: number
  userName: string
  userEmail: string
  rating: number
  comment: string
  approved: number
  createdAt: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])

  function load() { fetch("/api/reviews").then(r => r.json()).then(setReviews) }
  useEffect(load, [])

  async function approve(id: number) {
    await fetch(`/api/reviews/${id}`, { method: "PATCH" })
    load()
  }

  async function remove(id: number) {
    await fetch(`/api/reviews?id=${id}`, { method: "DELETE" })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">Reviews</h1>
        <button type="button" onClick={load} className="p-2 hover:bg-secondary/50 transition-colors border border-border"><RefreshCw className="w-4 h-4" /></button>
      </div>

      <div className="bg-card border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left px-6 py-4 text-muted-foreground font-medium">Product</th>
              <th className="text-left px-6 py-4 text-muted-foreground font-medium">Customer</th>
              <th className="text-left px-6 py-4 text-muted-foreground font-medium">Rating</th>
              <th className="text-left px-6 py-4 text-muted-foreground font-medium">Comment</th>
              <th className="text-left px-6 py-4 text-muted-foreground font-medium">Date</th>
              <th className="text-left px-6 py-4 text-muted-foreground font-medium">Status</th>
              <th className="text-right px-6 py-4 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 && <tr><td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">No reviews yet</td></tr>}
            {reviews.map(r => (
              <tr key={r.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-6 py-4">#{r.productId}</td>
                <td className="px-6 py-4">
                  <div className="font-medium">{r.userName}</div>
                  <div className="text-xs text-muted-foreground">{r.userEmail}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-xs truncate text-muted-foreground">{r.comment}</td>
                <td className="px-6 py-4 text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  {r.approved ? <span className="text-emerald-500 text-xs font-medium">Approved</span> : <span className="text-amber-500 text-xs font-medium">Pending</span>}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {!r.approved && (
                      <button type="button" onClick={() => approve(r.id)} className="p-2 hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors" title="Approve">
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button type="button" onClick={() => remove(r.id)} className="p-2 hover:bg-destructive/10 hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
