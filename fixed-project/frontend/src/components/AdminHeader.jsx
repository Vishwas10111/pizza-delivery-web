import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAdminStore } from '../store/admin'

function AdminHeader() {
  const navigate = useNavigate()
  const logout = useAdminStore((state) => state.logout)
  const isadminloggedin = useAdminStore((state) => state.isadminloggedin)
  const admin = useAdminStore((state) => state.admin)

  const handleLogout = () => {
    logout()
    navigate('/adminlogin', { replace: true })
  }

  return (
    <>
      <header className="main-header header-1">
        <div className="top-header">
          <div className="container">
            <div className="top-header-inner">
              <div className="top-header-contacts">
                <ul className="top-header-nav">
                  <li>
                    <a className="p-0" href="tel:+917990456948">
                      <i className="fas fa-phone mr-2" /> +91 79904 56948
                    </a>
                  </li>
                </ul>
              </div>
              <ul className="top-header-nav header-cta">
                <li>
                  {isadminloggedin
                    ? <span style={{ color: '#fff' }}>Welcome, {admin?.name || 'Admin'}</span>
                    : <Link to="/adminlogin">Admin Login</Link>
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <nav className="navbar">
            <a className="navbar-brand" href="/">
              <img src="/slices/assets/img/logo.png" alt="logo" />
            </a>
            <ul className="navbar-nav">
              <li className="menu-item">
                <NavLink to="/admindashboard">Dashboard</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/adminorders">Orders</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/adminmenu">Menu</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/adminusers">Users</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/adminmessages">Messages</NavLink>
              </li>
            </ul>
            <div className="header-controls">
              <ul className="header-controls-inner">
                <li className="menu-item">
                  <span
                    onClick={handleLogout}
                    style={{ cursor: 'pointer', color: '#e74c3c', fontWeight: 600 }}
                  >
                    Logout
                  </span>
                </li>
              </ul>
              <div className="aside-toggler aside-trigger">
                <span />
                <span />
                <span />
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default AdminHeader
