import { cookies } from 'next/headers'
import { en } from './translations/en'
import { fr } from './translations/fr'
import { ar } from './translations/ar'
import { get } from './db'

type Translations = typeof en

const all: Record<string, Translations> = { en, fr, ar }

export async function getPageData(page: string) {
  const cookieStore = await cookies()
  const lang = cookieStore.get('lang')?.value || 'en'
  const t = all[lang] || en

  const row = await get('SELECT * FROM page_content WHERE page = ? AND published = 1', [page])

  let content: { title: string; subtitle: string; description: string; images: string[] } | null = null
  if (row) {
    content = {
      title: (row[`title_${lang}`] || row.title || '') as string,
      subtitle: (row[`subtitle_${lang}`] || row.subtitle || '') as string,
      description: (row[`description_${lang}`] || row.description || '') as string,
      images: row.images ? JSON.parse(row.images as string) : [],
    }
  }

  return { t, lang, content }
}
