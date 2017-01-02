import { Schema } from 'mongoose'

export default new Schema({
  name: { type: String, required: true, unique: true, index: true, trim: true },
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)
