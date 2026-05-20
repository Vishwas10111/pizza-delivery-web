import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Subheader from '../../components/Subheader'
import { useParams } from 'react-router-dom'
import { getMenuItem } from '../../utils/api'
import { useCartStore } from '../../store/cart'
import { success, error } from '../../utils/messages'

function MenuItem() {
  const { id } = useParams()
  const [pizza, setPizza] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const updateitems = useCartStore((state) => state.updateitems)

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await getMenuItem(id)
        setPizza(res.data)
      } catch (e) {
        error('Failed to load item.')
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [id])

  function addtocart() {
    if (!pizza) return
    for (let i = 0; i < quantity; i++) {
      updateitems({ id: pizza._id, quantity: 1, title: pizza.title, url: pizza.url, price: pizza.price, tprice: pizza.price })
    }
    success(`${pizza.title} (x${quantity}) added to cart!`)
  }

  if (loading) return <div className="text-center py-5"><Header /><p>Loading...</p></div>
  if (!pizza) return <div className="text-center py-5"><Header /><p>Item not found.</p><Footer /></div>

  return (
    <>
      <Header />
      <Subheader title={pizza.title} />
      <div className="section product-single">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="product-thumb">
                <img src={pizza.url} alt={pizza.title} width={400} />
              </div>
            </div>
            <div className="col-md-7">
              <div className="product-content">
                <h2 className="title">{pizza.title}</h2>
                <div className="ct-rating-wrapper">
                  <div className="ct-rating">
                    <i className="fas fa-star active" />
                    <i className="fas fa-star active" />
                    <i className="fas fa-star active" />
                    <i className="fas fa-star active" />
                    <i className="fas fa-star" />
                  </div>
                  <span>(24 ratings)</span>
                </div>
                <div className="price-wrapper">
                  <p className="product-price">${pizza.price}</p>
                </div>
                <p>{pizza.description}</p>

                <div className="product-quantity" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <label><strong>Quantity:</strong></label>
                  <button
                    className="btn-custom btn-sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >-</button>
                  <span style={{ fontWeight: 600, fontSize: '18px' }}>{quantity}</span>
                  <button
                    className="btn-custom btn-sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >+</button>
                </div>

                <button onClick={addtocart} className="btn-custom primary">
                  Add to Cart <i className="fas fa-shopping-cart" />
                </button>

                <ul className="product-meta mt-4">
                  <li>
                    <span>Category: </span>
                    <div className="product-meta-item">
                      <a href="#">{pizza.category || 'Pizza'}</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MenuItem
