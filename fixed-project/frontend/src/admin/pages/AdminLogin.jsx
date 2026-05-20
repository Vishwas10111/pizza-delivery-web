import React, { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import { useAdminStore } from '../../store/admin'
import { loginAdmin } from '../../utils/api'
import { error, success } from '../../utils/messages'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useAdminStore((state) => state.login)
  const navigate = useNavigate()

  async function signin(e) {
    e.preventDefault()
    if (!email.trim() || !pwd.trim()) {
      error('All fields are required')
      return
    }
    setLoading(true)
    try {
      const res = await loginAdmin({ email: email.trim(), password: pwd })
      login(res.data.admin, res.data.token)
      success('Admin login successful!')
      navigate('/admindashboard', { replace: true })
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Admin login failed'
      error(msg)
      console.error('Admin login error:', err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="section">
        <div className="imgs-wrapper">
          <img src="/slices/assets/img/veg/11.png" alt="veg" className="d-none d-lg-block" />
          <img src="/slices/assets/img/prods/3.png" alt="veg" className="d-none d-lg-block" />
        </div>
        <div className="container">
          <div className="auth-wrapper">
            <div
              className="auth-description bg-cover bg-center dark-overlay dark-overlay-2"
              style={{ backgroundImage: 'url("/slices/assets/img/auth.jpg")' }}
            >
              <div className="auth-description-inner">
                <i className="flaticon-chili" />
                <h2>Admin Panel</h2>
                <p>Sign in to manage orders, menu, and customers.</p>
              </div>
            </div>
            <div className="auth-form">
              <h2>Admin Log In</h2>

              <div style={{ marginBottom: '16px', padding: '12px 14px', background: '#fff8e1', borderRadius: '8px', fontSize: '13px', color: '#555', border: '1px solid #ffe082' }}>
                <strong>Default credentials:</strong><br />
                📧 admin@slicespizzeria.com<br />
                🔑 admin123<br />
                <span style={{ color: '#27ae60', marginTop: '4px', display: 'block' }}>✅ Admin account is auto-created when the backend starts.</span>
              </div>

              <form onSubmit={signin}>
                <div className="form-group">
                  <input
                    value={email}
                    type="email"
                    className="form-control form-control-light"
                    placeholder="Admin Email"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <input
                    value={pwd}
                    type="password"
                    className="form-control form-control-light"
                    placeholder="Password"
                    onChange={(e) => setPwd(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <button type="submit" className="btn-custom primary" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login as Admin'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AdminLogin
