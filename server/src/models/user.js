import { Schema } from 'mongoose'
import database from './../database'
import { isEmail, sha512 } from './../utils'

const nameSchema = new Schema({
  first: { type: String, required: true },
  middle: { type: String },
  last: { type: String, required: true }
})

const schema = new Schema({
  username: { type: String, required: true, unique: true, index: true, trim: true },
  password: { type: String, required: true, select: false },
  email: {
    type: String, validate: {
      validator: (value) => {
        return isEmail(value)
      },
      message: '{VALUE} is not a valid email!',
      required: [ true, 'Email is required' ]
    },
    index: true,
    trim: true,
    unique: true
  },
  name: { type: nameSchema },
  token: { type: String },
  avatar: { type: String },
  admin: { type: Boolean, default: false }
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

schema.methods.hashPassword = function() {
  this.password = sha512(this.password)

  return this.password
}

// Before save
schema.pre('save', (next) => {
  // Do stuff here
  next()
})

export default database.model('User', schema)