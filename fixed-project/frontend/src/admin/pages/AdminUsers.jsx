import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader'
import Subheader from '../../components/Subheader'
import { getAllUsers, deleteUser } from '../../utils/api'
import { success, error } from '../../utils/messages'

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch(() => error('Failed to load users'))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete user "${name}"? This will not delete their orders.`)) return
    try {
      await deleteUser(id)
      setUsers((prev) => prev.filter((u) => u._id !== id))
      success('User deleted')
    } catch (e) {
      error('Failed to delete user')
    }
  }

  const filtered = users.filter(
    (u) =>
      !search ||
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <AdminHeader />
      <Subheader title="Manage Users" />
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <h4>Registered Users ({users.length})</h4>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: 300 }}
            />
          </div>

          {loading ? (
            <div className="text-center py-5"><p>Loading users...</p></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-5"><p>No users found.</p></div>
          ) : (
            <div className="checkout-billing">
              <table className="ct-responsive-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registered</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td data-title="Name">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: '50%',
                              background: '#e74c3c',
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '14px',
                              flexShrink: 0
                            }}
                          >
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                          <strong>{user.name}</strong>
                        </div>
                      </td>
                      <td data-title="Email">{user.email}</td>
                      <td data-title="Registered">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          className="btn-custom btn-sm shadow-none"
                          style={{ background: '#e74c3c', color: '#fff' }}
                          onClick={() => handleDelete(user._id, user.name)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
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

export default AdminUsers
