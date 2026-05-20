import './App.css'
import Register from './user/pages/Register'
import Home from './user/pages/Home'
import Menu from './user/pages/Menu'
import MenuItem from './user/pages/MenuItem'
import Login from './user/pages/Login'
import Cart from './user/pages/Cart'
import { Navigate, Route, Routes } from 'react-router-dom'
import Checkout from './user/pages/Checkout'
import MyOrders from './user/pages/MyOrders'
import Orders from './admin/pages/Orders'
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminMenu from './admin/pages/AdminMenu'
import AdminUsers from './admin/pages/AdminUsers'
import AdminMessages from './admin/pages/AdminMessages'
import Contact from './user/pages/Contact'
import About from './user/pages/About'
import { useUserStore } from './store/user'
import { useAdminStore } from './store/admin'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const isloggedin = useUserStore((state) => state.isloggedin)
  const isadminloggedin = useAdminStore((state) => state.isadminloggedin)

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/menu/:id' element={<MenuItem />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        {/* Protected user routes */}
        <Route path='/checkout' element={isloggedin ? <Checkout /> : <Navigate to='/login' />} />
        <Route path='/myorders' element={isloggedin ? <MyOrders /> : <Navigate to='/login' />} />

        {/* Admin routes */}
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/adminorders' element={isadminloggedin ? <Orders /> : <Navigate to='/adminlogin' />} />
        <Route path='/admindashboard' element={isadminloggedin ? <AdminDashboard /> : <Navigate to='/adminlogin' />} />
        <Route path='/adminmenu' element={isadminloggedin ? <AdminMenu /> : <Navigate to='/adminlogin' />} />
        <Route path='/adminusers' element={isadminloggedin ? <AdminUsers /> : <Navigate to='/adminlogin' />} />
        <Route path='/adminmessages' element={isadminloggedin ? <AdminMessages /> : <Navigate to='/adminlogin' />} />

        {/* Fallback */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
}

export default App
