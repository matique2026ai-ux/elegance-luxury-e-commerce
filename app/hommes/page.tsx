import { store } from "@/lib/data-store"
import { cookies } from 'next/headers'
import { HommesClient } from "./client"

export const metadata = {
  title: "MAISON HERAHIMA | Men's Collection",
  description: "Refined elegance for the modern gentleman. Discover our curated collection of men's luxury fashion.",
}

export default async function HommesPage() {
  const cookieStore = await cookies()
  const lang = cookieStore.get('lang')?.value || 'en'
  const products = store.getProducts("men", undefined, lang)
  return <HommesClient products={JSON.parse(JSON.stringify(products))} />
}