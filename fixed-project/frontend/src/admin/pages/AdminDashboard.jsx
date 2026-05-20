import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader'
import Subheader from '../../components/Subheader'
import { getAdminDashboard } from '../../utils/api'
import { useAdminStore } from '../../store/admin'
import { Link } from 'react-router-dom'

function StatCard({ title, value, icon, color, to }) {
  const inner = (
    <div style={{
      background: '#fff', borderRadius: '12px', padding: '24px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)', borderLeft: `4px solid ${color}`,
      display: 'flex', alignItems: 'center', gap: '16px', height: '100%',
      color: 'inherit', transition: 'box-shadow 0.2s',
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: '50%', background: color + '22',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24, flexShrink: 0
      }}>{icon}</div>
      <div>
        <p style={{ margin: 0, fontSize: '13px', color: '#999' }}>{title}</p>
        <h3 style={{ margin: 0, fontWeight: 700, color: '#333', fontSize: '28px' }}>{value}</h3>
      </div>
    </div>
  )
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      {to ? <Link to={to} style={{ textDecoration: 'none' }}>{inner}</Link> : inner}
    </div>
  )
}

const STATUS_COLORS = {
  Placed: '#f39c12', Confirmation: '#3498db', Preparation: '#9b59b6',
  'Out For Delivery': '#1abc9c', Completed: '#27ae60', Cancelled: '#e74c3c',
}

function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)
  const admin = useAdminStore((state) => state.admin)

  useEffect(() => {
    getAdminDashboard()
      .then((res) => setStats(res.data))
      .catch((e) => setErr(e.response?.data?.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <AdminHeader />
      <Subheader title="Dashboard" />
      <section className="section">
        <div className="container">
          <h4 style={{ marginBottom: '24px' }}>
            Welcome back, <strong>{admin?.name || 'Admin'}</strong> 👋
          </h4>

          {loading && <div className="text-center py-5"><p>Loading dashboard...</p></div>}
          {err && <div className="text-center py-5"><p style={{ color: '#e74c3c' }}>Error: {err}</p></div>}

          {!loading && !err && stats && (
            <>
              <div className="row">
                <StatCard title="Total Users"      value={stats.totalUsers ?? 0}      icon="👥" color="#3498db" to="/adminusers" />
                <StatCard title="Total Orders"     value={stats.totalOrders ?? 0}     icon="🍕" color="#e67e22" to="/adminorders" />
                <StatCard title="Pending Orders"   value={stats.pendingOrders ?? 0}   icon="⏳" color="#f39c12" to="/adminorders" />
                <StatCard title="Total Revenue"    value={`$${(stats.totalRevenue ?? 0).toFixed(2)}`} icon="💰" color="#27ae60" />
              </div>
              <div className="row mb-4">
                <StatCard title="Completed Orders" value={stats.completedOrders ?? 0} icon="✅" color="#27ae60" />
                <StatCard title="Unread Messages"  value={stats.unreadMessages ?? 0}  icon="✉️" color="#9b59b6" to="/adminmessages" />
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h5 style={{ margin: 0 }}>Recent Orders</h5>
                      <Link to="/adminorders" className="btn-custom btn-sm shadow-none">View All</Link>
                    </div>
                    {!stats.recentOrders || stats.recentOrders.length === 0 ? (
                      <p style={{ color: '#999', textAlign: 'center', padding: '20px 0' }}>No orders yet.</p>
                    ) : (
                      <table className="ct-responsive-table">
                        <thead>
                          <tr>
                            <th>Order ID</th><th>Customer</th><th>Amount</th><th>Date</th><th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.recentOrders.map((order) => (
                            <tr key={order._id}>
                              <td><small style={{ fontFamily: 'monospace' }}>{order._id.slice(-8).toUpperCase()}</small></td>
                              <td>{order.fnm} {order.lnm}</td>
                              <td><strong>${order.totalprice}</strong></td>
                              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                              <td>
                                <span style={{
                                  background: STATUS_COLORS[order.status] || '#999',
                                  color: '#fff', padding: '3px 10px',
                                  borderRadius: '10px', fontSize: '12px', fontWeight: 600
                                }}>{order.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default AdminDashboard
