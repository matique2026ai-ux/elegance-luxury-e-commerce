import { getPageData } from "@/lib/server-i18n"
import BoutiquesClient from "./boutiques-client"

export default async function BoutiquesPage() {
  const { t, content } = await getPageData('boutiques')
  return <BoutiquesClient translations={t.boutiques} content={content} />
}
