import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Subheader from '../../components/Subheader'
import { getMyOrders } from '../../utils/api'

const STATUS_COLORS = {
  Placed: '#f39c12',
  Confirmation: '#3498db',
  Preparation: '#9b59b6',
  'Out For Delivery': '#1abc9c',
  Completed: '#27ae60',
  Cancelled: '#e74c3c',
}

function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  async function fetchOrders() {
    try {
      const res = await getMyOrders()
      setOrders(res.data)
    } catch (e) {
      console.error('Failed to fetch orders', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    // Poll every 30 seconds so status updates from admin are reflected
    const interval = setInterval(fetchOrders, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Header />
      <Subheader title="My Orders" />
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="text-center py-5"><p>Loading your orders...</p></div>
          ) : orders.length === 0 ? (
            <div className="text-center py-5">
              <h4>No orders yet</h4>
              <p>Place your first order from our menu!</p>
            </div>
          ) : (
            <div className="checkout-billing">
              <table className="ct-responsive-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Address</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <React.Fragment key={order._id}>
                      <tr>
                        <td data-title="Order ID">
                          <small style={{ fontFamily: 'monospace' }}>{order._id.slice(-8).toUpperCase()}</small>
                        </td>
                        <td data-title="Date">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td data-title="Address">{order.address}, {order.city}</td>
                        <td data-title="Items">{order.items?.length} item(s)</td>
                        <td data-title="Total"><strong>${order.totalprice}</strong></td>
                        <td data-title="Status">
                          <span
                            style={{
                              background: STATUS_COLORS[order.status] || '#999',
                              color: '#fff',
                              padding: '4px 10px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: 600,
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-custom btn-sm shadow-none"
                            onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
                          >
                            {expandedId === order._id ? 'Hide' : 'View'}
                          </button>
                        </td>
                      </tr>
                      {expandedId === order._id && (
                        <tr>
                          <td colSpan={7} style={{ background: '#f9f9f9', padding: '16px' }}>
                            <strong>Items Ordered:</strong>
                            <table style={{ width: '100%', marginTop: '8px', fontSize: '13px' }}>
                              <thead>
                                <tr>
                                  <th>Pizza</th>
                                  <th>Qty</th>
                                  <th>Unit Price</th>
                                  <th>Subtotal</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.items?.map((item, i) => (
                                  <tr key={i}>
                                    <td>{item.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                    <td>${item.tprice}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {order.notes && <p className="mt-2"><strong>Notes:</strong> {order.notes}</p>}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default MyOrders
