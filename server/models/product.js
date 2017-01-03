import mongoose, { Schema } from 'mongoose'
import database from './../database'

const schema = new Schema({
  name: { type: String, required: true, unique: true, index: true, trim: true },
  price: { type: Number, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, required: true }
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

schema.path('price').get((value) => (value / 100).toFixed(2))
schema.path('price').set((value) => value * 100)

export default database.model('Product', schema)