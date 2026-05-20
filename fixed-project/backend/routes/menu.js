import express from 'express'
import MenuItem from '../models/MenuItem.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// GET /api/menu - Get all available menu items (public)
router.get('/', async (req, res) => {
  try {
    // Try available:true first, fall back to all items if none found
    let items = await MenuItem.find({ available: true }).sort({ createdAt: 1 })

    // Fallback: if no available items found, get all (handles case where
    // items were inserted without the available field set explicitly)
    if (items.length === 0) {
      items = await MenuItem.find().sort({ createdAt: 1 })
    }

    console.log(`[Menu] Returning ${items.length} items`)
    res.json(items)
  } catch (err) {
    console.error('[Menu] Error:', err.message)
    res.status(500).json({ message: 'Failed to fetch menu', error: err.message })
  }
})

// GET /api/menu/count - quick debug count (public)
router.get('/count', async (req, res) => {
  try {
    const total = await MenuItem.countDocuments()
    const available = await MenuItem.countDocuments({ available: true })
    res.json({ total, available })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/menu/all - Get all items including unavailable (admin only)
// IMPORTANT: must be defined before /:id to avoid 'all' being treated as an id param
router.get('/all', protect, adminOnly, async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: 1 })
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch menu', error: err.message })
  }
})

// GET /api/menu/:id - Get single menu item (public)
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch item', error: err.message })
  }
})

// POST /api/menu - Create menu item (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { title, description, price, url, category } = req.body
    if (!title || !description || !price || !url) {
      return res.status(400).json({ message: 'Title, description, price and image URL are required' })
    }
    const item = await MenuItem.create({ title, description, price, url, category, available: true })
    res.status(201).json({ message: 'Menu item created', item })
  } catch (err) {
    res.status(500).json({ message: 'Failed to create item', error: err.message })
  }
})

// PUT /api/menu/:id - Update menu item (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
    if (!item) return res.status(404).json({ message: 'Item not found' })
    res.json({ message: 'Menu item updated', item })
  } catch (err) {
    res.status(500).json({ message: 'Failed to update item', error: err.message })
  }
})

// DELETE /api/menu/:id - Delete menu item (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    res.json({ message: 'Menu item deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete item', error: err.message })
  }
})

export default router
