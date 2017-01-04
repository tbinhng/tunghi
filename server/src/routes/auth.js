import { Router } from 'express'
import { register, login, update, getUser } from './../actions/auth'
import authorize from './../middleware/authorize'
import User from './../models/user'

const router = Router()

router.get('/api/auth/me', async (req, res) => {
  if (!req.token) {
    return res.json(false)
  }

  const user = await getUser(req.token)
  res.json(user)
})

router.post('/api/auth/login', async (req, res) => {
  const { id, password } = req.body
  const token = await login(id, password)
  if (!token) {
    return res.status(400).send('Credentials is invalid')
  }

  return res.json({ token })
})

router.get('/api/auth/logout', async (req, res) => {
  if (!req.token) {
    return res.json(false)
  }

  const user = await User.findOneAndUpdate({ token: req.token }, { token: null }).lean()
  res.json(user)
})

router.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body

  const isTaken = await User.count({ email })
  if (isTaken) return res.status(400).send('Email already taken')

  const user = await register(email, password)
  res.json(user)
})

router.post('/api/auth/update', authorize, async (req, res) => {
  const updated = await update(req.body, req.body.file, req.token)
  if (!updated) return res.status(400).send('Username already taken')
  res.json(updated)
})

export default router
