import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

const encoder = (text: string) => new TextEncoder().encode(text)

function toCSV(headers: string[], rows: string[][]): string {
  const esc = (s: string) => `"${s.replace(/"/g, '""')}"`
  return [headers.join(","), ...rows.map(r => r.map(esc).join(","))].join("\n")
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  let csv = ""
  let filename = ""

  switch (type) {
    case "orders": {
      const orders = await store.getOrders()
      csv = toCSV(
        ["ID", "Customer Name", "Customer Email", "Phone", "Wilaya", "Commune", "Address", "Items", "Total", "Shipping", "Grand Total", "Status", "Date"],
        orders.map(o => {
          const c = o.customer
          return [o.id, c.name, c.email || "", c.phone || "", c.wilaya || "", c.commune || "", c.address || "", JSON.stringify(o.items), String(o.total), String(o.shippingPrice), String(o.grandTotal), o.status, o.createdAt]
        })
      )
      filename = "orders.csv"
      break
    }
    case "subscribers": {
      const subs = await store.getSubscribers()
      csv = toCSV(["ID", "Email", "Date"], subs.map(s => [String(s.id), s.email, s.date]))
      filename = "subscribers.csv"
      break
    }
    case "users": {
      const users = await store.getAllUsers()
      csv = toCSV(["ID", "Name", "Email", "Date"], users.map(u => [String(u.id), u.name, u.email, u.createdAt]))
      filename = "users.csv"
      break
    }
    case "reviews": {
      const reviews = await store.getReviews()
      csv = toCSV(
        ["ID", "Product ID", "User Name", "User Email", "Rating", "Comment", "Approved", "Date"],
        reviews.map(r => [String(r.id), String(r.productId), r.userName, r.userEmail, String(r.rating), r.comment, r.approved ? "Yes" : "No", r.createdAt])
      )
      filename = "reviews.csv"
      break
    }
    case "activity": {
      const logs = await store.getActivityLog()
      csv = toCSV(
        ["ID", "Action", "Entity Type", "Entity ID", "Description", "Admin", "Date"],
        logs.map(l => [String(l.id), l.action, l.entityType, l.entityId, l.description, l.adminName, l.createdAt])
      )
      filename = "activity-log.csv"
      break
    }
    default:
      return NextResponse.json({ error: "Invalid type. Use: orders, subscribers, users, reviews, activity" }, { status: 400 })
  }

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  })
}
