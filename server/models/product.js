import mongoose, { Schema } from 'mongoose'

const Product = new Schema({
  name: { type: String, required: true, unique: true, index: true, trim: true },
  price: { type: Number, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, required: true }
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

Product.path('price').get((value) => (value / 100).toFixed(2))
Product.path('price').set((value) => value * 100)

export default Product