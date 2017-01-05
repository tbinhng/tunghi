import { Router } from 'express'
import { register, login, update, getUser } from './../actions/auth'
import authorize from './../middleware/authorize'
import User from './../models/user'

const router = Router()

router.get('/user', authorize, async (req, res) => {
  if (!req.token) {
    return res.json({result: false, message: 'Token not found.'})
  }

  const user = await getUser(req.token)
  res.json({ result: true, data: user })
})

router.post('/login', async (req, res) => {
  const { id, password } = req.body
  const token = await login(id, password)
  if (!token) {
    return res.status(400).send('Credentials is invalid')
  }

  res.status(200).json({ result: true, data: token })
})

router.get('/logout', async (req, res) => {
  if (!req.token) {
    return res.json(false)
  }

  await User.findOneAndUpdate({ token: req.token }, { token: null }).lean()
  res.json({ result: true })
})

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  const isTaken = await User.count({ username, email })
  if (isTaken) return res.status(400).send('Username or email already taken.')

  await register({ username, email, password })
  res.json({ result: true })
})

router.post('/update', authorize, async (req, res) => {
  const user = await update(req.body, req.body.file, req.token)
  if (!updated) return res.status(400).send('Username already taken')
  res.json({ result: true, data: user })
})

export default router
