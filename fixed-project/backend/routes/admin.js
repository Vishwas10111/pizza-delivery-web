import express from 'express'
import User from '../models/User.js'
import Order from '../models/Order.js'
import Contact from '../models/Contact.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// GET /api/admin/users - Get all users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message })
  }
})

// DELETE /api/admin/users/:id - Delete a user
router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user', error: err.message })
  }
})

// GET /api/admin/dashboard - Dashboard stats
router.get('/dashboard', protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' })
    const totalOrders = await Order.countDocuments()
    const pendingOrders = await Order.countDocuments({ status: 'Placed' })
    const completedOrders = await Order.countDocuments({ status: 'Completed' })
    const unreadMessages = await Contact.countDocuments({ read: false })
    const revenueResult = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalprice' } } }
    ])
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name email')

    res.json({
      totalUsers,
      totalOrders,
      pendingOrders,
      completedOrders,
      unreadMessages,
      totalRevenue: revenueResult[0]?.total || 0,
      recentOrders
    })
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: err.message })
  }
})

// POST /api/admin/reseed — force reseed menu items (admin only)
router.post('/reseed', protect, adminOnly, async (req, res) => {
  try {
    const MenuItem = (await import('../models/MenuItem.js')).default
    const DEFAULT_MENU = [
      { title: 'Pepperoni Pizza', description: 'Classic pepperoni pizza loaded with premium pepperoni slices on our signature tomato sauce and mozzarella cheese.', url: '/slices/assets/img/prods-sm/1.png', price: 12, category: 'Pizza', available: true },
      { title: 'Four Cheese', description: 'A rich blend of mozzarella, cheddar, parmesan, and gouda on a creamy white sauce base. Cheese lovers rejoice!', url: '/slices/assets/img/prods-sm/2.png', price: 14, category: 'Pizza', available: true },
      { title: 'Barbeque Chicken', description: 'Tender grilled chicken pieces with smoky BBQ sauce, red onions, and melted mozzarella on a crispy crust.', url: '/slices/assets/img/prods-sm/3.png', price: 16, category: 'Pizza', available: true },
      { title: 'Vegetarian', description: 'Fresh garden vegetables including bell peppers, mushrooms, olives, and onions on our herbed tomato sauce.', url: '/slices/assets/img/prods-sm/4.png', price: 20, category: 'Pizza', available: true },
      { title: 'Swiss Mushroom', description: 'Earthy mushrooms with Swiss cheese and caramelized onions on a garlic butter base. A true classic.', url: '/slices/assets/img/prods-sm/5.png', price: 18, category: 'Pizza', available: true },
      { title: 'Hawaiian', description: 'Sweet pineapple and savory ham create the perfect sweet-salty combination on our signature tomato sauce.', url: '/slices/assets/img/prods-sm/6.png', price: 13, category: 'Pizza', available: true },
      { title: 'Seven Cheese', description: 'The ultimate cheese experience: seven premium cheeses melted together on a golden garlic butter crust.', url: '/slices/assets/img/prods-sm/7.png', price: 17, category: 'Pizza', available: true },
    ]
    await MenuItem.deleteMany({})
    const inserted = await MenuItem.insertMany(DEFAULT_MENU)
    res.json({ message: `Reseeded ${inserted.length} menu items successfully` })
  } catch (err) {
    res.status(500).json({ message: 'Reseed failed', error: err.message })
  }
})

export default router
