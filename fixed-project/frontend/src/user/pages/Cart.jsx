import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useCartStore } from '../../store/cart'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/user'
import { error } from '../../utils/messages'

function Cart() {
  const items = useCartStore((state) => state.items)
  const updatecart = useCartStore((state) => state.updatecart)
  const totalprice = useCartStore((state) => state.totalprice)
  const removeitem = useCartStore((state) => state.removeitem)
  const clearcart = useCartStore((state) => state.clearcart)
  const isloggedin = useUserStore((state) => state.isloggedin)
  const navigate = useNavigate()

  function handleCheckout() {
    if (items.length === 0) {
      error('Your cart is empty!')
      return
    }
    if (isloggedin) {
      navigate('/checkout')
    } else {
      navigate('/login')
    }
  }

  return (
    <>
      <Header />
      <section className="section">
        <div className="container">
          {items.length === 0 ? (
            <div className="text-center py-5">
              <h4>Your cart is empty</h4>
              <p>Add some delicious pizzas to get started!</p>
              <button className="btn-custom primary mt-3" onClick={() => navigate('/menu')}>
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              <table className="ct-responsive-table">
                <thead>
                  <tr>
                    <th className="remove-item" />
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((cartitem, index) => (
                    <tr key={index}>
                      <td className="remove">
                        <button
                          onClick={() => removeitem(index)}
                          type="button"
                          className="close-btn close-danger remove-from-cart"
                        >
                          <span />
                          <span />
                        </button>
                      </td>
                      <td data-title="Product">
                        <div className="cart-product-wrapper">
                          <img src={cartitem.url} alt={cartitem.title} style={{ width: 60, height: 60, objectFit: 'cover' }} />
                          <div className="cart-product-body">
                            <h6><a href="#">{cartitem.title}</a></h6>
                          </div>
                        </div>
                      </td>
                      <td data-title="Price"><strong>${cartitem.price}</strong></td>
                      <td className="quantity" data-title="Quantity">
                        <input
                          onChange={(e) => {
                            const val = Number(e.target.value)
                            if (val >= 1) updatecart(index, val)
                          }}
                          type="number"
                          className="qty form-control"
                          value={cartitem.quantity}
                          min={1}
                        />
                      </td>
                      <td data-title="Total"><strong>${cartitem.tprice}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="row mt-3 mb-3">
                <div className="col-lg-4">
                  <button
                    className="btn-custom shadow-none"
                    style={{ background: '#e74c3c', color: '#fff' }}
                    onClick={clearcart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="row ct-cart-form">
                <div className="offset-lg-6 col-lg-6">
                  <h4>Cart Total</h4>
                  <table>
                    <tbody>
                      <tr>
                        <th>Subtotal</th>
                        <td>${totalprice.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>Tax</th>
                        <td>$0.00</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td><b>${totalprice.toFixed(2)}</b></td>
                      </tr>
                    </tbody>
                  </table>
                  <button onClick={handleCheckout} className="btn-custom primary btn-block">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Cart
