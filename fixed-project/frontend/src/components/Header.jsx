import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cart'
import { useUserStore } from '../store/user'

function Header() {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const isloggedin = useUserStore((state) => state.isloggedin)
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
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
                  <Link to="/adminlogin">Admin Login</Link>
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
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/about">About</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/menu">Menu</NavLink>
              </li>
              {isloggedin && (
                <li className="menu-item">
                  <NavLink to="/myorders">My Orders</NavLink>
                </li>
              )}
              <li className="menu-item">
                <NavLink to="/contact">Contact</NavLink>
              </li>
              {isloggedin ? (
                <li className="menu-item">
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={handleLogout}
                    className="nav-link"
                  >
                    Logout ({user?.name})
                  </span>
                </li>
              ) : (
                <>
                  <li className="menu-item">
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </>
              )}
            </ul>
            <div className="header-controls">
              <ul className="header-controls-inner">
                <li
                  className="cart-dropdown-wrapper cart-trigger"
                  onClick={() => navigate('/cart')}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="cart-item-count">{items.length}</span>
                  <i className="flaticon-shopping-bag" />
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

export default Header
