import React, { useState } from 'react'
import { error, success } from '../utils/messages'

function NewsLetter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!email) {
      error('Please enter your email address!')
      return
    }
    setLoading(true)
    // Simulate newsletter signup (can wire to a /api/newsletter endpoint later)
    await new Promise((r) => setTimeout(r, 500))
    success('Thank you for subscribing to our newsletter!')
    setEmail('')
    setLoading(false)
  }

  return (
    <section
      className="section bg-center bg-cover dark-overlay"
      style={{ backgroundImage: 'url("/slices/assets/img/bg/1.jpg")' }}
    >
      <div className="container">
        <div className="ct-newsletter">
          <div className="section-title-wrap section-header">
            <h2 className="title">Join Our Newsletter</h2>
            <p className="subtitle">
              Stay in the loop with all things pizza! Sign up for our newsletter to receive exclusive
              deals, mouthwatering recipes and more.
            </p>
          </div>
          <form onSubmit={submit}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              placeholder="Enter your email address"
            />
            <button type="submit" className="btn-custom primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'} <i className="far fa-paper-plane" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default NewsLetter
