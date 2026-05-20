import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader'
import Subheader from '../../components/Subheader'
import { getAllMenu, createMenuItem, updateMenuItem, deleteMenuItem } from '../../utils/api'
import { success, error } from '../../utils/messages'

const EMPTY_FORM = { title: '', description: '', price: '', url: '', category: 'Pizza', available: true }

function AdminMenu() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  async function fetchMenu() {
    try {
      const res = await getAllMenu()
      setItems(res.data)
    } catch (e) {
      error('Failed to load menu items')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMenu() }, [])

  function openAdd() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  function openEdit(item) {
    setEditingId(item._id)
    setForm({ title: item.title, description: item.description, price: item.price, url: item.url, category: item.category || 'Pizza', available: item.available })
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title || !form.description || !form.price || !form.url) {
      error('All fields are required')
      return
    }
    setSaving(true)
    try {
      if (editingId) {
        await updateMenuItem(editingId, { ...form, price: Number(form.price) })
        success('Menu item updated!')
      } else {
        await createMenuItem({ ...form, price: Number(form.price) })
        success('Menu item added!')
      }
      setShowForm(false)
      fetchMenu()
    } catch (e) {
      error(e.response?.data?.message || 'Failed to save item')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    try {
      await deleteMenuItem(id)
      success('Item deleted')
      setItems((prev) => prev.filter((i) => i._id !== id))
    } catch (e) {
      error('Failed to delete item')
    }
  }

  async function toggleAvailable(item) {
    try {
      await updateMenuItem(item._id, { available: !item.available })
      setItems((prev) => prev.map((i) => i._id === item._id ? { ...i, available: !i.available } : i))
      success(`Item ${!item.available ? 'enabled' : 'disabled'}`)
    } catch (e) {
      error('Failed to update availability')
    }
  }

  return (
    <>
      <AdminHeader />
      <Subheader title="Manage Menu" />
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h4>Menu Items ({items.length})</h4>
            <button className="btn-custom primary" onClick={openAdd}>+ Add New Item</button>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '12px', padding: '24px', marginBottom: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h5 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</h5>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label>Title *</label>
                    <input className="form-control" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Pizza name" />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Price ($) *</label>
                    <input className="form-control" type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Category</label>
                    <input className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Pizza" />
                  </div>
                  <div className="form-group col-md-12">
                    <label>Image URL *</label>
                    <input className="form-control" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="/slices/assets/img/prods-sm/1.png" />
                  </div>
                  <div className="form-group col-md-12">
                    <label>Description *</label>
                    <textarea className="form-control" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe this pizza..." />
                  </div>
                  <div className="form-group col-md-12">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} />
                      Available for ordering
                    </label>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn-custom primary" disabled={saving}>
                    {saving ? 'Saving...' : (editingId ? 'Update Item' : 'Add Item')}
                  </button>
                  <button type="button" className="btn-custom shadow-none" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* Menu Items Table */}
          {loading ? (
            <div className="text-center py-5"><p>Loading...</p></div>
          ) : (
            <div className="checkout-billing">
              <table className="ct-responsive-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img src={item.url} alt={item.title} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '8px' }} />
                      </td>
                      <td data-title="Title">
                        <strong>{item.title}</strong>
                        <br />
                        <small style={{ color: '#999' }}>{item.description?.slice(0, 60)}...</small>
                      </td>
                      <td data-title="Price"><strong>${item.price}</strong></td>
                      <td data-title="Category">{item.category}</td>
                      <td data-title="Available">
                        <span
                          onClick={() => toggleAvailable(item)}
                          style={{
                            cursor: 'pointer',
                            background: item.available ? '#27ae60' : '#e74c3c',
                            color: '#fff',
                            padding: '4px 12px',
                            borderRadius: '10px',
                            fontSize: '12px',
                            fontWeight: 600,
                            userSelect: 'none'
                          }}
                        >
                          {item.available ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button className="btn-custom btn-sm shadow-none" onClick={() => openEdit(item)}>
                            Edit
                          </button>
                          <button
                            className="btn-custom btn-sm shadow-none"
                            style={{ background: '#e74c3c', color: '#fff' }}
                            onClick={() => handleDelete(item._id, item.title)}
                          >
                            Delete
                          </button>
                        </div>
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

export default AdminMenu
