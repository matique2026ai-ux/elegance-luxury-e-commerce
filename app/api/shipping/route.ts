import { NextResponse } from "next/server"
import { getWilayaByCode, wilayas } from "@/lib/wilayas"

export async function POST(request: Request) {
  try {
    const { wilayaCode } = await request.json()
    const wilaya = getWilayaByCode(Number(wilayaCode))
    if (!wilaya) {
      return NextResponse.json({ error: "Invalid wilaya code" }, { status: 400 })
    }
    return NextResponse.json({
      wilaya: wilaya,
      shippingPrice: wilaya.shippingPrice,
      estimatedDays: wilaya.shippingPrice <= 500 ? "1-2" : wilaya.shippingPrice <= 700 ? "2-4" : "4-7",
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(wilayas)
}
