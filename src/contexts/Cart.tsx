import { createContext, ReactNode, useContext, useState } from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage'

export type Order = {
  id: number
  quantity: number
}

type Cart = {
  open: () => void
  close: () => void

  orders: Order[]
  addOrder: (order: Order) => void
  setOrderQuantity: (id: number, dispatch: (prev: number) => number) => void
}

const CartContext = createContext({} as Cart)

export const useCart = () => useContext(CartContext)

type Props = {
  children: ReactNode
}

export const CartProvider = ({ children }: Props) => {
  const [isOpen, setOpen] = useState(false)
  const [orders, setOrders] = useLocalStorage('orders', [] as Order[])

  const open = () => setOpen(true)
  const close = () => setOpen(false)

  const addOrder = (order: Order) => {
    setOrders((prev: Order[]) => prev.concat(order))
  }

  const setOrderQuantity = (id: number, dispatch: (prev: number) => number) => {
    setOrders((prev: Order[]) =>
      prev.reduce((acc, order) => {
        if (id !== order.id) return acc.concat(order)

        const quantity = dispatch(order.quantity)
        if (quantity === 0) return acc

        return acc.concat({ ...order, quantity })
      }, [] as Order[])
    )
  }

  return (
    <CartContext.Provider
      value={{ open, close, orders, addOrder, setOrderQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}
