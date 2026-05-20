import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import menuRoutes from './routes/menu.js'
import orderRoutes from './routes/orders.js'
import contactRoutes from './routes/contact.js'
import MenuItem from './models/MenuItem.js'
import User from './models/User.js'

dotenv.config()

const app = express()

// CORS — allow any localhost port
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (origin.match(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/)) {
      return callback(null, true)
    }
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(express.json())

// ─── AUTO SEED ─────────────────────────────────────────────────────────────────
// Automatically seeds the database if it's empty — no manual npm run seed needed
const DEFAULT_MENU = [
  { title: 'Pepperoni Pizza', description: 'Classic pepperoni pizza loaded with premium pepperoni slices on our signature tomato sauce and mozzarella cheese.', url: '/slices/assets/img/prods-sm/1.png', price: 12, category: 'Pizza', available: true },
  { title: 'Four Cheese', description: 'A rich blend of mozzarella, cheddar, parmesan, and gouda on a creamy white sauce base. Cheese lovers rejoice!', url: '/slices/assets/img/prods-sm/2.png', price: 14, category: 'Pizza', available: true },
  { title: 'Barbeque Chicken', description: 'Tender grilled chicken pieces with smoky BBQ sauce, red onions, and melted mozzarella on a crispy crust.', url: '/slices/assets/img/prods-sm/3.png', price: 16, category: 'Pizza', available: true },
  { title: 'Vegetarian', description: 'Fresh garden vegetables including bell peppers, mushrooms, olives, and onions on our herbed tomato sauce.', url: '/slices/assets/img/prods-sm/4.png', price: 20, category: 'Pizza', available: true },
  { title: 'Swiss Mushroom', description: 'Earthy mushrooms with Swiss cheese and caramelized onions on a garlic butter base. A true classic.', url: '/slices/assets/img/prods-sm/5.png', price: 18, category: 'Pizza', available: true },
  { title: 'Hawaiian', description: 'Sweet pineapple and savory ham create the perfect sweet-salty combination on our signature tomato sauce.', url: '/slices/assets/img/prods-sm/6.png', price: 13, category: 'Pizza', available: true },
  { title: 'Seven Cheese', description: 'The ultimate cheese experience: seven premium cheeses melted together on a golden garlic butter crust.', url: '/slices/assets/img/prods-sm/7.png', price: 17, category: 'Pizza', available: true },
]

async function autoSeed() {
  try {
    const menuCount = await MenuItem.countDocuments()
    if (menuCount === 0) {
      await MenuItem.insertMany(DEFAULT_MENU)
      console.log(`🍕 Auto-seeded ${DEFAULT_MENU.length} menu items`)
    } else {
      console.log(`🍕 Menu already has ${menuCount} items — skipping seed`)
    }

    const adminExists = await User.findOne({ role: 'admin' })
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@slicespizzeria.com',
        password: 'admin123',
        role: 'admin'
      })
      console.log('👤 Admin account auto-created: admin@slicespizzeria.com / admin123')
    } else {
      console.log('👤 Admin account already exists')
    }
  } catch (err) {
    console.error('⚠️  Auto-seed error:', err.message)
  }
}

// ─── CONNECT DB + AUTO SEED ────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected successfully')
    await autoSeed()  // <-- runs every startup, safe (skips if data exists)
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err.message))

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/contact', contactRoutes)

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Slices Pizzeria API is running',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date().toISOString()
  })
})

// 404
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} not found` })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack)
  res.status(500).json({
    message: 'Something went wrong',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🍕 Slices Pizzeria API running on http://localhost:${PORT}`)
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`)
})
