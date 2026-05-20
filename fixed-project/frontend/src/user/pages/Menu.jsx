import React, { useEffect, useState, useCallback } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PizzaCard from '../../components/PizzaCard'
import { getMenu } from '../../utils/api'

function Menu() {
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const fetchMenu = useCallback(async () => {
    setLoading(true)
    setErr(null)
    try {
      const res = await getMenu()
      setMenu(res.data)
      if (res.data.length === 0) {
        setErr('no_items')
      }
    } catch (e) {
      console.error('Menu fetch error:', e)
      if (e.code === 'ERR_NETWORK' || e.message === 'Network Error') {
        setErr('backend_down')
      } else {
        setErr(e.response?.data?.message || 'Failed to load menu')
      }
    } finally {
      setLoading(false)
    }
  }, [retryCount])

  useEffect(() => {
    fetchMenu()
  }, [fetchMenu])

  return (
    <div>
      <Header />
      <div className="section section-padding menu-v2">
        <div className="container">
          <div
            className="menu-category dark-overlay dark-overlay-2"
            style={{ backgroundImage: 'url("/slices/assets/img/categories-lg/1.jpg")' }}
          >
            <h3>Pizzas</h3>
            <p>Explore our mouthwatering selection of pizzas, featuring a variety of toppings and flavors.</p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-5">
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🍕</div>
              <p style={{ color: '#888' }}>Loading pizzas...</p>
            </div>
          )}

          {/* Error: Backend not running */}
          {!loading && err === 'backend_down' && (
            <div className="text-center py-5" style={{ padding: '32px', background: '#fff8f8', borderRadius: '12px', margin: '24px 0', border: '1px solid #ffd0d0' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>⚠️</div>
              <h4 style={{ color: '#e74c3c' }}>Cannot connect to backend</h4>
              <p style={{ color: '#666' }}>The backend server is not running. Please start it:</p>
              <div style={{ background: '#1e1e1e', color: '#00ff88', padding: '14px 20px', borderRadius: '8px', fontFamily: 'monospace', textAlign: 'left', display: 'inline-block', marginTop: '12px', fontSize: '14px' }}>
                <div style={{ color: '#888', marginBottom: '4px' }}># Open a new terminal:</div>
                <div>cd slices-pizza-mongodb/backend</div>
                <div>npm install</div>
                <div>npm run seed</div>
                <div>npm run dev</div>
              </div>
              <br />
              <button
                className="btn-custom primary mt-4"
                style={{ marginTop: '20px' }}
                onClick={() => setRetryCount(c => c + 1)}
              >
                ↻ Retry
              </button>
            </div>
          )}

          {/* Error: No items (not seeded) */}
          {!loading && err === 'no_items' && (
            <div className="text-center py-5" style={{ padding: '32px', background: '#fffdf0', borderRadius: '12px', margin: '24px 0', border: '1px solid #ffe082' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌱</div>
              <h4 style={{ color: '#e67e22' }}>Menu is empty — database not seeded</h4>
              <p style={{ color: '#666' }}>No pizza items found in the database. Run the seed command:</p>
              <div style={{ background: '#1e1e1e', color: '#00ff88', padding: '14px 20px', borderRadius: '8px', fontFamily: 'monospace', textAlign: 'left', display: 'inline-block', marginTop: '12px', fontSize: '14px' }}>
                <div style={{ color: '#888', marginBottom: '4px' }}># In your backend terminal:</div>
                <div>npm run seed</div>
                <div style={{ color: '#888', marginTop: '4px' }}># Then restart backend:</div>
                <div>npm run dev</div>
              </div>
              <br />
              <button
                className="btn-custom primary"
                style={{ marginTop: '20px' }}
                onClick={() => setRetryCount(c => c + 1)}
              >
                ↻ Retry After Seeding
              </button>
            </div>
          )}

          {/* Other error */}
          {!loading && err && err !== 'backend_down' && err !== 'no_items' && (
            <div className="text-center py-5">
              <p style={{ color: '#e74c3c' }}>Error: {err}</p>
              <button className="btn-custom primary mt-3" onClick={() => setRetryCount(c => c + 1)}>
                ↻ Retry
              </button>
            </div>
          )}

          {/* Pizza cards */}
          {!loading && !err && (
            <div className="row" style={{ marginTop: '30px' }}>
              {menu.map((pizza) => (
                <PizzaCard
                  key={pizza._id}
                  id={pizza._id}
                  title={pizza.title}
                  description={pizza.description}
                  price={pizza.price}
                  url={pizza.url}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Menu
