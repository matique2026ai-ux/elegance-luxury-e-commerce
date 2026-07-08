"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import { en } from "./translations/en"
import { fr } from "./translations/fr"
import { ar } from "./translations/ar"

export type Lang = "en" | "fr" | "ar"
type Translations = typeof en

const translations: Record<Lang, Translations> = { en, fr, ar }

interface I18nContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
  dir: "ltr" | "rtl"
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang)
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", newLang)
      document.documentElement.lang = newLang
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr"
    }
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null
    if (saved && translations[saved]) {
      setLang(saved)
    }
  }, [setLang])

  const t = translations[lang]
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr"

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
