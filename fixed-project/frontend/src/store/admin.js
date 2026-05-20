import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

export const useAdminStore = create(
  persist(
    immer((set) => ({
      admin: null,
      token: null,
      isadminloggedin: false,

      login: (admin, token) =>
        set((state) => {
          state.admin = admin
          state.token = token
          state.isadminloggedin = true
          localStorage.setItem('token', token)
        }),

      logout: () =>
        set((state) => {
          state.admin = null
          state.token = null
          state.isadminloggedin = false
          localStorage.removeItem('token')
        }),
    })),
    {
      name: 'adminstore',
      storage: {
        getItem:    (name) => { const v = localStorage.getItem(name);  return v ? JSON.parse(v) : null },
        setItem:    (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)
