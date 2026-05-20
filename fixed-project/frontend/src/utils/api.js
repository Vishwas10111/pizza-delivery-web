import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' }
})

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// On 401 — clear all auth data and redirect to login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('userstore')
      localStorage.removeItem('adminstore')
      const path = window.location.pathname
      if (!path.includes('login')) {
        window.location.href = path.includes('admin') ? '/adminlogin' : '/login'
      }
    }
    return Promise.reject(error)
  }
)

// ─── Auth ──────────────────────────────────────────────────────────────────────
export const registerUser  = (data)       => API.post('/auth/register', data)
export const loginUser     = (data)       => API.post('/auth/login', data)
export const loginAdmin    = (data)       => API.post('/auth/admin/login', data)
export const getMe         = ()           => API.get('/auth/me')

// ─── Menu ──────────────────────────────────────────────────────────────────────
export const getMenu        = ()          => API.get('/menu')
export const getAllMenu      = ()          => API.get('/menu/all')
export const getMenuItem    = (id)        => API.get(`/menu/${id}`)
export const createMenuItem = (data)      => API.post('/menu', data)
export const updateMenuItem = (id, data)  => API.put(`/menu/${id}`, data)
export const deleteMenuItem = (id)        => API.delete(`/menu/${id}`)

// ─── Orders ────────────────────────────────────────────────────────────────────
export const placeOrder        = (data)        => API.post('/orders', data)
export const getMyOrders       = ()            => API.get('/orders/my')
export const getAllOrders       = ()            => API.get('/orders')
export const getOrderStats     = ()            => API.get('/orders/stats')
export const updateOrderStatus = (id, status)  => API.patch(`/orders/${id}/status`, { status })

// ─── Admin ─────────────────────────────────────────────────────────────────────
export const getAdminDashboard = ()    => API.get('/admin/dashboard')
export const getAllUsers        = ()    => API.get('/admin/users')
export const deleteUser        = (id)  => API.delete(`/admin/users/${id}`)

// ─── Contact ───────────────────────────────────────────────────────────────────
export const sendContactMessage   = (data) => API.post('/contact', data)
export const getContactMessages   = ()     => API.get('/contact')
export const markContactRead      = (id)   => API.patch(`/contact/${id}/read`)
export const deleteContactMessage = (id)   => API.delete(`/contact/${id}`)

export default API
