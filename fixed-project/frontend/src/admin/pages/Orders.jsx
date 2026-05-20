import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader'
import Subheader from '../../components/Subheader'
import { getAllOrders, updateOrderStatus } from '../../utils/api'
import { success, error } from '../../utils/messages'

const STATUS_OPTIONS = ['Placed', 'Confirmation', 'Preparation', 'Out For Delivery', 'Completed', 'Cancelled']

const STATUS_COLORS = {
  Placed: '#f39c12',
  Confirmation: '#3498db',
  Preparation: '#9b59b6',
  'Out For Delivery': '#1abc9c',
  Completed: '#27ae60',
  Cancelled: '#e74c3c',
}

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [expandedId, setExpandedId] = useState(null)
  const [search, setSearch] = useState('')

  async function fetchOrders() {
    try {
      const res = await getAllOrders()
      setOrders(res.data)
    } catch (e) {
      error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 15000) // refresh every 15s
    return () => clearInterval(interval)
  }, [])

  async function handleStatusChange(id, status) {
    try {
      await updateOrderStatus(id, status)
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)))
      success('Order status updated!')
    } catch (e) {
      error('Failed to update status')
    }
  }

  const filtered = orders.filter((o) => {
    const matchFilter = filter === 'All' || o.status === filter
    const matchSearch =
      !search ||
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      o.fnm?.toLowerCase().includes(search.toLowerCase()) ||
      o.lnm?.toLowerCase().includes(search.toLowerCase()) ||
      o.address?.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <>
      <AdminHeader />
      <Subheader title="Manage Orders" />

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className="row mb-4" style={{ gap: '8px', flexWrap: 'wrap', padding: '0 15px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by ID, name, address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: 300 }}
            />
            <select
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ maxWidth: 200 }}
            >
              <option value="All">All Statuses</option>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="btn-custom shadow-none" onClick={fetchOrders}>
              ↻ Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-5"><p>Loading orders...</p></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-5"><p>No orders found.</p></div>
          ) : (
            <div className="checkout-billing">
              <table className="ct-responsive-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <React.Fragment key={order._id}>
                      <tr>
                        <td data-title="Order ID">
                          <small style={{ fontFamily: 'monospace', fontSize: '11px' }}>
                            {order._id.slice(-8).toUpperCase()}
                          </small>
                        </td>
                        <td data-title="Customer">
                          {order.fnm} {order.lnm}
                          <br />
                          <small style={{ color: '#999' }}>{order.mobile}</small>
                        </td>
                        <td data-title="Address">
                          {order.address}, {order.city}
                        </td>
                        <td data-title="Total"><strong>${order.totalprice}</strong></td>
                        <td data-title="Date">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td data-title="Status">
                          <select
                            className="form-control"
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            style={{
                              borderColor: STATUS_COLORS[order.status],
                              color: STATUS_COLORS[order.status],
                              fontWeight: 600,
                              minWidth: 160
                            }}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button
                            className="btn-custom btn-sm shadow-none"
                            onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
                          >
                            {expandedId === order._id ? 'Hide' : 'Items'}
                          </button>
                        </td>
                      </tr>
                      {expandedId === order._id && (
                        <tr>
                          <td colSpan={7} style={{ background: '#f5f5f5', padding: '16px' }}>
                            <strong>Order Items:</strong>
                            <table style={{ width: '100%', marginTop: '8px', fontSize: '13px' }}>
                              <thead>
                                <tr>
                                  <th>Item</th><th>Qty</th><th>Unit Price</th><th>Subtotal</th>
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
                            {order.notes && (
                              <p className="mt-2"><strong>Notes:</strong> {order.notes}</p>
                            )}
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
    </>
  )
}

export default Orders
