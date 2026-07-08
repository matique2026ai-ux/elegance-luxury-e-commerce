import { store } from "@/lib/data-store"
import { cookies } from 'next/headers'
import { FemmesClient } from "./client"

export const metadata = {
  title: "MAISON HERAHIMA | Women's Collection",
  description: "Timeless sophistication for every woman. Explore our exclusive women's luxury collection.",
}

export default async function FemmesPage() {
  const cookieStore = await cookies()
  const lang = cookieStore.get('lang')?.value || 'en'
  const products = store.getProducts("women", undefined, lang)
  return <FemmesClient products={JSON.parse(JSON.stringify(products))} />
}