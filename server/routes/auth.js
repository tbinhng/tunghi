import { Router } from 'express'
import { register, login, update } from './../actions/auth'
import authorize from './../middleware/authorize'
import db from './../database'
const router = Router()

router.post('/api/auth/login', async (req, res) => {
  const { id, password } = req.body
  const token = await login(id, password)
  if (!token) {
    return res.status(400).send('Credentials is invalid')
  }

  return res.json(token)
})

router.get('/api/auth/logout', async (req, res) => {
  if (!req.token) {
    return res.json(false)
  }

  const user = await db.user.findOneAndUpdate({ token: req.token }, { token: null }).lean()
  res.json(user)
})

router.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body
  let user = await db.user.count({ username })
  if (user) return res.status(400).send('Username already taken')

  user = await register({ username, password })
  res.json(user)
})

router.post('/api/auth/update', authorize, async (req, res) => {
  const updated = await update(req.body, req.body.file, req.token)
  if (!updated) return res.status(400).send('Username already taken')
  res.json(updated)
})

export default router
