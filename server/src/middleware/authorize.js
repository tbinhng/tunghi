import logger from 'debug'
import { checkAuthorized } from './../actions/auth'

/**
 * Middleware for checking if we're logged in
 * @param req
 * @param res
 * @param next
 */
export default (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  checkAuthorized(token).then(auth => {
    logger('server:authorized')(auth._id)
    req.authorized = true
    req.token = auth.token
    next()
  }).catch(error => {
    logger('server:error')(error)
    if (req.headers[ 'user-agent' ].includes('node-fetch')) {
      req.authorized = false
      next()
    } else {
      return res.status(401).send(error)
    }
  })
}
