import { createContext, useContext, useState, useCallback } from 'react'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [preset, setPreset] = useState('')
  // openOrder('starter') — paket oldindan tanlanadi; onClick={openOrder} bo'lsa tanlanmaydi
  const openOrder = useCallback((pkgId) => {
    setPreset(typeof pkgId === 'string' ? pkgId : '')
    setOpen(true)
  }, [])
  const closeOrder = useCallback(() => setOpen(false), [])

  return (
    <OrderContext.Provider value={{ open, preset, openOrder, closeOrder }}>{children}</OrderContext.Provider>
  )
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder OrderProvider ichida ishlatilishi kerak')
  return ctx
}
