import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader'
import Subheader from '../../components/Subheader'
import { getContactMessages, markContactRead, deleteContactMessage } from '../../utils/api'
import { success, error } from '../../utils/messages'

function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    try {
      const res = await getContactMessages()
      setMessages(res.data)
    } catch (e) {
      error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  async function handleRead(id) {
    try {
      await markContactRead(id)
      setMessages((prev) => prev.map((m) => m._id === id ? { ...m, read: true } : m))
    } catch (e) {
      error('Failed to mark as read')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this message?')) return
    try {
      await deleteContactMessage(id)
      setMessages((prev) => prev.filter((m) => m._id !== id))
      if (selected?._id === id) setSelected(null)
      success('Message deleted')
    } catch (e) {
      error('Failed to delete')
    }
  }

  function openMessage(msg) {
    setSelected(msg)
    if (!msg.read) handleRead(msg._id)
  }

  const unread = messages.filter((m) => !m.read).length

  return (
    <>
      <AdminHeader />
      <Subheader title="Contact Messages" />
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <h4>
              Inbox ({messages.length})
              {unread > 0 && (
                <span style={{ marginLeft: '10px', background: '#e74c3c', color: '#fff', borderRadius: '12px', padding: '2px 10px', fontSize: '13px' }}>
                  {unread} unread
                </span>
              )}
            </h4>
            <button className="btn-custom shadow-none" onClick={fetchMessages}>↻ Refresh</button>
          </div>

          {/* Message detail panel */}
          {selected && (
            <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '24px', marginBottom: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h5 style={{ margin: 0 }}>{selected.subject}</h5>
                  <p style={{ margin: '4px 0 0', color: '#666', fontSize: '13px' }}>
                    From: <strong>{selected.fnm} {selected.lnm}</strong> &lt;{selected.email}&gt; &nbsp;·&nbsp;
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#999' }}
                >×</button>
              </div>
              <div style={{ background: '#f9f9f9', borderRadius: '8px', padding: '16px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                {selected.msg}
              </div>
              <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="btn-custom primary btn-sm shadow-none"
                >
                  Reply via Email
                </a>
                <button
                  className="btn-custom btn-sm shadow-none"
                  style={{ background: '#e74c3c', color: '#fff' }}
                  onClick={() => handleDelete(selected._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-5"><p>Loading messages...</p></div>
          ) : messages.length === 0 ? (
            <div className="text-center py-5"><p>No contact messages yet.</p></div>
          ) : (
            <div className="checkout-billing">
              <table className="ct-responsive-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr
                      key={msg._id}
                      style={{ background: msg.read ? 'transparent' : '#fffbf0', cursor: 'pointer' }}
                      onClick={() => openMessage(msg)}
                    >
                      <td>
                        <span style={{
                          display: 'inline-block',
                          width: 10, height: 10,
                          borderRadius: '50%',
                          background: msg.read ? '#ccc' : '#e74c3c'
                        }} />
                      </td>
                      <td data-title="Name" style={{ fontWeight: msg.read ? 400 : 700 }}>
                        {msg.fnm} {msg.lnm}
                      </td>
                      <td data-title="Email">{msg.email}</td>
                      <td data-title="Subject" style={{ fontWeight: msg.read ? 400 : 700 }}>
                        {msg.subject}
                      </td>
                      <td data-title="Date">{new Date(msg.createdAt).toLocaleDateString()}</td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="btn-custom btn-sm shadow-none"
                            onClick={() => openMessage(msg)}
                          >View</button>
                          <button
                            className="btn-custom btn-sm shadow-none"
                            style={{ background: '#e74c3c', color: '#fff' }}
                            onClick={() => handleDelete(msg._id)}
                          >Delete</button>
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

export default AdminMessages
