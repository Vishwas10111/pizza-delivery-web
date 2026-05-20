import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  quantity: Number,
  tprice: Number,
  url: String
}, { _id: false })

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  fnm: String,
  lnm: String,
  company: String,
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  notes: String,
  items: [orderItemSchema],
  totalprice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Placed', 'Confirmation', 'Preparation', 'Out For Delivery', 'Completed', 'Cancelled'],
    default: 'Placed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

orderSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model('Order', orderSchema)
