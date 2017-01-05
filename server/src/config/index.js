const path = require('path')

export default {
  http: {
    port: 2000
  },
  session: {
    salt: 'tunghishop',
    secret: 'yZUzCiUKA4PKLuuq52v7KICqOymLbTfK',
    expires: 2 * 3600 * 1000 // 2 hours
  },
  databases: {
    mongo: 'mongodb://127.0.0.1:27017/tunghi'
  }
}
