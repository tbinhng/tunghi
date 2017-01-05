import jwt from 'jsonwebtoken'
import User from './../models/user'
import config from './../config'
import { isEmail, sha512 } from './../utils'

/**
 * Get account by token
 * @param token {string}
 * @returns {object}
 */
export const getUser = async (token) => {
  if (token) {
    const user = await User.findOne({ token })
    return user || null
  }
}

export const register = async (credentials) => {
  const user = new User(credentials)
  user.hashPassword()
  await user.save()

  user.token = createAuthToken(user._id)
  await user.save()

  return true
}

export const login = async (id, password) => {
  let credentials = { password: sha512(password) };
  if (isEmail(id)) {
    credentials.email = id
  } else credentials.username = id
  
  const user = await User.findOne(credentials)
  if (!user) return null

  user.token = createAuthToken(user._id)
  await user.save()

  return user.token
}

export const update = async (body, file, token) => {
  let query = {}

  const existed = await User.findOne({ username: body.username }, '_id').lean()
  if (existed) return false

  query = {...query, ...body}
  const user = await User.findOneAndUpdate({ token }, { $set: query }, { new: true }).lean()
  return user
}

/**
 * Check if we're logged in
 * @param token {string}
 * @returns {boolean}
 */
export const checkAuthorized = async (token) => {
  if (!token) return Promise.reject('Token not provided')
  const user = await User.findOne({ token }, 'token')
  if (user) {
    const decoded = jwt.verify(user.token, config.session.secret)
    if (Date.now() < decoded.exp) {
      return Promise.resolve(user)
    }
  }
  return Promise.reject('Invalid token')
}

/**
 * Create a new token with a timestamp
 * @private
 * @param userID
 * @returns {string|*}
 */
const createAuthToken = (payload) => {
  return jwt.sign(payload, config.session.secret, {
    expiresIn: Date.now() + config.session.expires
  })
}