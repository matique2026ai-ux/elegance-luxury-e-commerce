import { store } from "@/lib/data-store"
import { cookies } from 'next/headers'
import { EnfantsClient } from "./client"

export const metadata = {
  title: "MAISON HERAHIMA | Children's Collection",
  description: "Petite luxury for little ones. Discover our exclusive children's fashion collection.",
}

export default async function EnfantsPage() {
  const cookieStore = await cookies()
  const lang = cookieStore.get('lang')?.value || 'en'
  const products = store.getProducts("children", undefined, lang)
  return <EnfantsClient products={JSON.parse(JSON.stringify(products))} />
}
