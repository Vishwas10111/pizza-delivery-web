import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'
import MenuItem from './models/MenuItem.js'

dotenv.config()

const menuItems = [
  {
    title: 'Pepperoni Pizza',
    description: 'Classic pepperoni pizza loaded with premium pepperoni slices on our signature tomato sauce and mozzarella cheese.',
    url: '/slices/assets/img/prods-sm/1.png',
    price: 12,
    category: 'Pizza',
    available: true
  },
  {
    title: 'Four Cheese',
    description: 'A rich blend of mozzarella, cheddar, parmesan, and gouda on a creamy white sauce base. Cheese lovers rejoice!',
    url: '/slices/assets/img/prods-sm/2.png',
    price: 14,
    category: 'Pizza',
    available: true
  },
  {
    title: 'Barbeque Chicken',
    description: 'Tender grilled chicken pieces with smoky BBQ sauce, red onions, and melted mozzarella on a crispy crust.',
    url: '/slices/assets/img/prods-sm/3.png',
    price: 16,
    category: 'Pizza',
    available: true
  },
  {
    title: 'Vegetarian',
    description: 'Fresh garden vegetables including bell peppers, mushrooms, olives, and onions on our herbed tomato sauce.',
    url: '/slices/assets/img/prods-sm/4.png',
    price: 20,
    category: 'Pizza',
    available: true
  },
  {
    title: 'Swiss Mushroom',
    description: 'Earthy mushrooms with Swiss cheese and caramelized onions on a garlic butter base. A true classic.',
    url: '/slices/assets/img/prods-sm/5.png',
    price: 18,
    category: 'Pizza',
    available: true
  },
  {
    title: 'Hawaiian',
    description: 'Sweet pineapple and savory ham create the perfect sweet-salty combination on our signature tomato sauce.',
    url: '/slices/assets/img/prods-sm/6.png',
    price: 13,
    category: 'Pizza',
    available: true
  },
  {
    title: 'Seven Cheese',
    description: 'The ultimate cheese experience: seven premium cheeses melted together on a golden garlic butter crust.',
    url: '/slices/assets/img/prods-sm/7.png',
    price: 17,
    category: 'Pizza',
    available: true
  }
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB connected')

    // Clear menu items and re-insert fresh
    const deleted = await MenuItem.deleteMany({})
    console.log(`🧹 Cleared ${deleted.deletedCount} old menu items`)

    // Insert all with available:true explicitly
    const inserted = await MenuItem.insertMany(menuItems)
    console.log(`🍕 Inserted ${inserted.length} menu items with available:true`)

    // Show inserted items
    inserted.forEach((item, i) => {
      console.log(`   ${i + 1}. ${item.title} — $${item.price} — available: ${item.available}`)
    })

    // Remove old admin accounts and recreate
    await User.deleteMany({ role: 'admin' })

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@slicespizzeria.com',
      password: 'admin123',
      role: 'admin'
    })
    console.log('\n👤 Admin account created:')
    console.log('   Email:    admin@slicespizzeria.com')
    console.log('   Password: admin123')

    // Count total users  
    const userCount = await User.countDocuments({ role: 'user' })
    console.log(`\n📊 DB Summary:`)
    console.log(`   Menu items: ${inserted.length}`)
    console.log(`   Admin accounts: 1`)
    console.log(`   Regular users: ${userCount}`)

    console.log('\n✅ Seed complete! Now run: npm run dev')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  }
}

seed()
