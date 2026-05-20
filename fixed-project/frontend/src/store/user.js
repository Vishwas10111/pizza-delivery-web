import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    immer((set) => ({
      user: null,
      token: null,
      isloggedin: false,

      login: (user, token) =>
        set((state) => {
          state.user = user
          state.token = token
          state.isloggedin = true
          localStorage.setItem('token', token)
        }),

      logout: () =>
        set((state) => {
          state.user = null
          state.token = null
          state.isloggedin = false
          localStorage.removeItem('token')
        }),

      updateUser: (user) =>
        set((state) => { state.user = user }),
    })),
    {
      name: 'userstore',
      storage: {
        getItem:    (name) => { const v = localStorage.getItem(name);  return v ? JSON.parse(v) : null },
        setItem:    (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)
