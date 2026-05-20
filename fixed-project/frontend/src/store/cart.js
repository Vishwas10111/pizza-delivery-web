import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    immer((set) => ({
      items: [],
      totalprice: 0,

      updateitems: (item) =>
        set((state) => {
          const index = state.items.findIndex((i) => i.id === item.id)
          if (index === -1) {
            state.items.push({ ...item, quantity: item.quantity || 1, tprice: item.price * (item.quantity || 1) })
          } else {
            state.items[index].quantity += 1
            state.items[index].tprice = state.items[index].quantity * state.items[index].price
          }
          state.totalprice = state.items.reduce((sum, i) => sum + i.tprice, 0)
        }),

      removeitem: (index) =>
        set((state) => {
          state.items.splice(index, 1)
          state.totalprice = state.items.reduce((sum, i) => sum + i.tprice, 0)
        }),

      updatecart: (index, quantity) =>
        set((state) => {
          if (quantity < 1) return
          state.items[index].quantity = quantity
          state.items[index].tprice = quantity * state.items[index].price
          state.totalprice = state.items.reduce((sum, i) => sum + i.tprice, 0)
        }),

      clearcart: () =>
        set((state) => {
          state.items = []
          state.totalprice = 0
        }),
    })),
    {
      name: 'cartstore',
      storage: {
        getItem: (name) => {
          const val = localStorage.getItem(name)
          return val ? JSON.parse(val) : null
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)
