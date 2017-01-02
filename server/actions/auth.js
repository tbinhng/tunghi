import jwt from 'jsonwebtoken'
import db from './../database'
import config from './../config'
import { isEmail, sha512 } from './../utils'

/**
 * Get account by token
 * @param token {string}
 * @returns {object}
 */
export const getUser = async (token) => {
  if (token) {
    const user = await db.user.findOne({ token })
    return user || null
  }
}

export const register = async (credentials) => {
  const user = new db.user(credentials)
  await user.save()
  
  return createAuthToken(user)
}

export const login = async (id, password) => {
  let credentials = { password: sha512(password) };
  if (isEmail(id)) {
    credentials.email = id
  } else credentials.username = id
  
  const user = await db.user.findOne(credentials)
  if (!user) return null

  return createAuthToken(user)
}

export const update = async (body, file, token) => {
  let query = {}

  const existed = await db.user.findOne({ username: body.username }, '_id').lean()
  if (existed) return false

  query = Object.assign({}, query, body)
  const user = await db.user.findOneAndUpdate({ token }, { $set: query }, { new: true }).lean()

  return {
    username: user.username,
    description: user.description,
    picture: user.picture
  }
}

/**
 * Check if we're logged in
 * @param token {string}
 * @returns {boolean}
 */
export const checkAuthorized = async (token) => {
  if (!token) return Promise.reject('Token not provided')
  const user = await db.user.findOne({ token }, 'token')
  if (user) {
    const decoded = jwt.verify(user.token, config.session.secret)
    if (Date.now() < decoded.expires) {
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