import React, { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../utils/api'
import { error, success } from '../../utils/messages'

function Register() {
  const [nm, setNm] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function signup(e) {
    e.preventDefault()

    if (!nm.trim() || !email.trim() || !pwd.trim()) {
      error('All fields are required!')
      return
    }
    if (pwd.length < 6) {
      error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await registerUser({ name: nm.trim(), email: email.trim(), password: pwd })
      success('Registration successful! Please login.')
      navigate('/login', { replace: true })
    } catch (err) {
      // Show the real server error message
      const msg = err.response?.data?.message || err.message || 'Registration failed'
      error(msg)
      console.error('Registration error details:', err.response?.data || err.message)
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
                <h2>Sign Up!</h2>
                <p>Create your account and start ordering delicious pizzas.</p>
              </div>
            </div>
            <div className="auth-form">
              <h2>Sign Up</h2>

              {/* Backend status indicator */}
              <div style={{ marginBottom: '16px', padding: '10px 14px', background: '#f0f9ff', borderRadius: '8px', fontSize: '13px', color: '#555', border: '1px solid #cce5ff' }}>
                💡 Make sure the backend is running: <code>npm run dev</code> in the <code>backend/</code> folder
              </div>

              <form onSubmit={signup}>
                <div className="form-group">
                  <input
                    value={nm}
                    type="text"
                    className="form-control form-control-light"
                    placeholder="Full Name"
                    onChange={(e) => setNm(e.target.value)}
                    disabled={loading}
                  />
                </div>
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
                    placeholder="Password (min 6 characters)"
                    onChange={(e) => setPwd(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <button type="submit" className="btn-custom primary" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
                <p className="mt-3">
                  Already have an account? <Link to="/login">Login</Link>
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

export default Register
