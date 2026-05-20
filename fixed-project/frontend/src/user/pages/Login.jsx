import React, { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/user'
import { loginUser } from '../../utils/api'
import { error, success } from '../../utils/messages'

function Login() {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useUserStore((state) => state.login)

  async function signin(e) {
    e.preventDefault()
    if (!email.trim() || !pwd.trim()) {
      error('All fields are required!')
      return
    }
    setLoading(true)
    try {
      const res = await loginUser({ email: email.trim(), password: pwd })
      login(res.data.user, res.data.token)
      success('Login successful!')
      navigate('/', { replace: true })
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed'
      error(msg)
      console.error('Login error details:', err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
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
                <h2>Welcome Back!</h2>
                <p>Sign in to order delicious pizzas and track your orders.</p>
              </div>
            </div>
            <div className="auth-form">
              <h2>Log In</h2>

              <div style={{ marginBottom: '16px', padding: '10px 14px', background: '#f0f9ff', borderRadius: '8px', fontSize: '13px', color: '#555', border: '1px solid #cce5ff' }}>
                💡 Make sure the backend is running: <code>npm run dev</code> in the <code>backend/</code> folder
              </div>

              <form onSubmit={signin}>
                <div className="form-group">
                  <input
                    value={email}
                    type="email"
                    className="form-control form-control-light"
                    placeholder="Email Address"
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
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className="mt-3">
                  Don't have an account? <Link to="/register">Create One</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login
