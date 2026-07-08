"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

interface FavoriteItem {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface FavoritesContextType {
  items: FavoriteItem[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (item: FavoriteItem) => void
  count: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<FavoriteItem[]>([])

  const isFavorite = useCallback((id: number) => items.some(i => i.id === id), [items])

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    setItems(prev => prev.some(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, item])
  }, [])

  return (
    <FavoritesContext.Provider value={{ items, isFavorite, toggleFavorite, count: items.length }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider")
  return ctx
}
