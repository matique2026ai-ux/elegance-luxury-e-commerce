import { cookies } from 'next/headers'
import { en } from './translations/en'
import { fr } from './translations/fr'
import { ar } from './translations/ar'
import { getPageContent } from './db'

type Translations = typeof en

const all: Record<string, Translations> = { en, fr, ar }

export async function getPageData(page: string) {
  const cookieStore = await cookies()
  const lang = cookieStore.get('lang')?.value || 'en'
  const t = all[lang] || en

  const row = await getPageContent(page)

  let content: { title: string; subtitle: string; description: string; images: string[] } | null = null
  if (row) {
    content = {
      title: (row[`title_${lang}` as keyof typeof row] || row.title || '') as string,
      subtitle: (row[`subtitle_${lang}` as keyof typeof row] || row.subtitle || '') as string,
      description: (row[`description_${lang}` as keyof typeof row] || row.description || '') as string,
      images: row.images ? JSON.parse(row.images as string) : [],
    }
  }

  return { t, lang, content }
}
