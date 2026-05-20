import React from 'react'
import { useCartStore } from '../store/cart'
import { Link } from 'react-router-dom'
import { success } from '../utils/messages'

function PizzaCard({ id, title, description, url, price }) {
  const updateitems = useCartStore((state) => state.updateitems)

  function addtocart() {
    const pizza = { id, quantity: 1, title, url, price, tprice: price }
    updateitems(pizza)
    success(`${title} added to cart!`)
  }

  return (
    <div className="col-lg-4 col-md-6">
      <div className="product">
        <Link className="product-thumb" to={`/menu/${id}`}>
          <img src={url} alt={title} />
        </Link>
        <div className="product-body">
          <div className="product-desc">
            <h4>
              <Link to={`/menu/${id}`}>{title}</Link>
            </h4>
            <p>{description}</p>
          </div>
          <div className="product-controls">
            <p className="product-price">${price}</p>
            <button onClick={addtocart} className="order-item btn-custom btn-sm shadow-none">
              Add <i className="fas fa-shopping-cart" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PizzaCard
