import { Router } from 'express'
import { register } from './../actions/auth'
import User from './../models/user'
import { sha512 } from './../utils'
const router = Router()

router.get('/', (req, res) => res.json('Hello World'))

router.get('/setup', async (req, res) => {
  const credentials = {
    username: 'tunghi',
    password: sha512('P@ssword'),
    email: 'admin@gmail.com',
    name: {
      first: 'Binh',
      last: 'Nguyen'
    },
    admin: true
  };

  let user = await User.findOne({username: 'tunghi'})
  if (user) {
    return res.json('Server has already setup.')
  }
  await register(credentials)

  res.json('DONE')
})

export default router