import express from 'express'
import Order from '../models/Order.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// POST /api/orders - Place a new order
router.post('/', protect, async (req, res) => {
  try {
    const { fnm, lnm, company, address, city, mobile, email, notes, items, totalprice } = req.body
    if (!fnm || !lnm || !address || !city || !mobile || !email || !items || items.length === 0) {
      return res.status(400).json({ message: 'All required fields must be filled' })
    }
    const order = await Order.create({
      userId: req.user._id,
      customerName: req.user.name,
      email, mobile, fnm, lnm, company, address, city, notes, items, totalprice,
      status: 'Placed'
    })
    res.status(201).json({ message: 'Order placed successfully', order })
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err.message })
  }
})

// GET /api/orders/my  ← MUST be before /:id
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message })
  }
})

// GET /api/orders/stats  ← MUST be before /:id
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const total     = await Order.countDocuments()
    const placed    = await Order.countDocuments({ status: 'Placed' })
    const completed = await Order.countDocuments({ status: 'Completed' })
    const revenue   = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalprice' } } }])
    res.json({ totalOrders: total, placedOrders: placed, completedOrders: completed, totalRevenue: revenue[0]?.total || 0 })
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats', error: err.message })
  }
})

// GET /api/orders - All orders (admin)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message })
  }
})

// GET /api/orders/:id  ← After /my and /stats
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order', error: err.message })
  }
})

// PATCH /api/orders/:id/status
router.patch('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body
    const valid = ['Placed', 'Confirmation', 'Preparation', 'Out For Delivery', 'Completed', 'Cancelled']
    if (!valid.includes(status)) return res.status(400).json({ message: 'Invalid status value' })
    const order = await Order.findByIdAndUpdate(req.params.id, { status, updatedAt: Date.now() }, { new: true })
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json({ message: 'Order status updated', order })
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order', error: err.message })
  }
})

export default router
