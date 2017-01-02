import { Schema } from 'mongoose'
import { isEmail } from './../utils'

const nameSchema = new mongoose.Schema({
  first: { type: String, required: true },
  middle: { type: String },
  last: { type: String, required: true }
})

export default new Schema({
  username: { type: String, required: true, unique: true, index: true, trim: true },
  password: { type: String, required: true, select: false },
  email: {
    type: String, validate: {
      validator: (value) => {
        return isEmail(value)
      },
      message: '{VALUE} is not a valid email!',
      required: [ true, 'Email is required' ]
    }
  },
  name: { type: nameSchema },
  token: { type: String, select: false },
  avatar: { type: String },
  admin: { type: Boolean, default: false }
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)
