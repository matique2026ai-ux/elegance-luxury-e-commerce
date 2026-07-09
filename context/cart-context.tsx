"use client"

import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  category: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; payload: CartItem[] }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  totalItems: number
  totalPrice: number
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i
        ),
      }
    case "CLEAR_CART":
      return { ...state, items: [] }
    case "HYDRATE":
      return { ...state, items: action.payload }
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }
    case "OPEN_CART":
      return { ...state, isOpen: true }
    case "CLOSE_CART":
      return { ...state, isOpen: false }
    default:
      return state
  }
}

function loadCart(): CartState {
  if (typeof window === "undefined") return { items: [], isOpen: false }
  try {
    const stored = localStorage.getItem("maison-herahima-cart")
    if (stored) return JSON.parse(stored)
  } catch {}
  return { items: [], isOpen: false }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  useEffect(() => {
    const stored = loadCart()
    if (stored && stored.items.length > 0) {
      dispatch({ type: "HYDRATE", payload: stored.items })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("maison-herahima-cart", JSON.stringify(state))
  }, [state])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const addItem = useCallback((item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item }), [])
  const removeItem = useCallback((id: number) => dispatch({ type: "REMOVE_ITEM", payload: id }), [])
  const updateQuantity = useCallback((id: number, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }), [])
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), [])
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE_CART" }), [])
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), [])
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), [])

  return (
    <CartContext.Provider value={{ items: state.items, isOpen: state.isOpen, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart, toggleCart, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
