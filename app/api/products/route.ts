import { NextResponse } from "next/server"
import { store } from "@/lib/data-store"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const sub = searchParams.get("sub")
  const lang = searchParams.get("lang")
  const query = searchParams.get("q")
  if (query) {
    return NextResponse.json(await store.searchProducts(query, lang || undefined))
  }
  return NextResponse.json(await store.getProducts(category || undefined, sub || undefined, lang || undefined))
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body.name || !body.category || !body.price) {
      return NextResponse.json({ error: "Name, category, and price are required" }, { status: 400 })
    }
    const product = await store.addProduct(body)
    return NextResponse.json(product, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
