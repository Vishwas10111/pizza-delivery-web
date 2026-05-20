import express from 'express'
import Contact from '../models/Contact.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// POST /api/contact — submit contact message (public)
router.post('/', async (req, res) => {
  try {
    const { fnm, lnm, email, subject, msg } = req.body
    if (!fnm || !lnm || !email || !subject || !msg) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const contact = await Contact.create({ fnm, lnm, email, subject, msg })
    res.status(201).json({ message: 'Message received. Thank you!', contact })
  } catch (err) {
    res.status(500).json({ message: 'Failed to save message', error: err.message })
  }
})

// GET /api/contact — get all messages (admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message })
  }
})

// PATCH /api/contact/:id/read — mark as read (admin only)
router.patch('/:id/read', protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
    if (!contact) return res.status(404).json({ message: 'Message not found' })
    res.json({ message: 'Marked as read', contact })
  } catch (err) {
    res.status(500).json({ message: 'Failed to update', error: err.message })
  }
})

// DELETE /api/contact/:id — delete message (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ message: 'Message deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete', error: err.message })
  }
})

export default router
