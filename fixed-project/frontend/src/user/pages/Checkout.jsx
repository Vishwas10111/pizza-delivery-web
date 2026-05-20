import React, { useState, useEffect } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Subheader from '../../components/Subheader'
import { useUserStore } from '../../store/user'
import { useCartStore } from '../../store/cart'
import { useNavigate } from 'react-router-dom'
import { placeOrder } from '../../utils/api'
import { error, success } from '../../utils/messages'

function Checkout() {
  const user = useUserStore((state) => state.user)
  const items = useCartStore((state) => state.items)
  const totalprice = useCartStore((state) => state.totalprice)
  const clearcart = useCartStore((state) => state.clearcart)
  const navigate = useNavigate()

  const [fnm, setFnm] = useState('')
  const [lnm, setLnm] = useState('')
  const [company, setCompany] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0) navigate('/cart', { replace: true })
  }, [])

  // Pre-fill from logged-in user
  useEffect(() => {
    if (user?.name) {
      const parts = user.name.trim().split(' ')
      setFnm(parts[0] || '')
      setLnm(parts.slice(1).join(' ') || '')
    }
    if (user?.email) setEmail(user.email)
  }, [user])

  async function checkout(e) {
    e.preventDefault()
    if (!fnm || !lnm || !city || !address || !mobile || !email) {
      error('All required fields must be filled!')
      return
    }
    setLoading(true)
    try {
      await placeOrder({ fnm, lnm, company, address, city, mobile, email, notes, items, totalprice })
      success('Order placed successfully! 🍕')
      clearcart()
      navigate('/myorders', { replace: true })
    } catch (err) {
      error(err.response?.data?.message || 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <Subheader title="Checkout" />
      <section className="section">
        <div className="container">
          <form onSubmit={checkout}>
            <div className="row">
              <div className="col-xl-8">
                <h4>Billing Details</h4>
                <div className="row">
                  <div className="form-group col-xl-6">
                    <label>First Name <span className="text-danger">*</span></label>
                    <input value={fnm} onChange={(e) => setFnm(e.target.value)} type="text" placeholder="First Name" className="form-control" />
                  </div>
                  <div className="form-group col-xl-6">
                    <label>Last Name <span className="text-danger">*</span></label>
                    <input value={lnm} onChange={(e) => setLnm(e.target.value)} type="text" placeholder="Last Name" className="form-control" />
                  </div>
                  <div className="form-group col-xl-12">
                    <label>Company Name</label>
                    <input value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Company Name (Optional)" className="form-control" />
                  </div>
                  <div className="form-group col-xl-12">
                    <label>Street Address <span className="text-danger">*</span></label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Street Address" className="form-control" />
                  </div>
                  <div className="form-group col-xl-12">
                    <label>Town / City <span className="text-danger">*</span></label>
                    <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="Town / City" className="form-control" />
                  </div>
                  <div className="form-group col-xl-6">
                    <label>Phone Number <span className="text-danger">*</span></label>
                    <input value={mobile} onChange={(e) => setMobile(e.target.value)} type="text" placeholder="Phone Number" className="form-control" />
                  </div>
                  <div className="form-group col-xl-6">
                    <label>Email Address <span className="text-danger">*</span></label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="form-control" />
                  </div>
                  <div className="form-group col-xl-12 mb-0">
                    <label>Order Notes</label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className="form-control" placeholder="Order Notes (Optional)" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 mt-4">
                <h4>Order Summary</h4>
                <div className="checkout-billing">
                  <table className="ct-responsive-table" style={{ fontSize: '14px' }}>
                    <thead>
                      <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
                    </thead>
                    <tbody>
                      {items.map((item, i) => (
                        <tr key={i}>
                          <td>{item.title}</td>
                          <td>x{item.quantity}</td>
                          <td>${item.tprice.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr style={{ borderTop: '2px solid #eee' }}>
                        <td colSpan={2}><strong>Total</strong></td>
                        <td><strong>${totalprice.toFixed(2)}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                  <button type="submit" className="btn-custom primary btn-block mt-3" disabled={loading}>
                    {loading ? 'Placing Order...' : '🍕 Place Order'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Checkout
