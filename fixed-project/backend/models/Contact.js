import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  fnm: { type: String, required: true, trim: true },
  lnm: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, required: true, trim: true },
  msg: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Contact', contactSchema)
