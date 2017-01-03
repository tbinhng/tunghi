import { Schema } from 'mongoose'
import database from './../database'

const schema = new Schema({
  name: { type: String, required: true, unique: true, index: true, trim: true },
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export default database.model('Category', schema)
