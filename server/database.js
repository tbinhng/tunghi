import logger from 'debug'
import Promise from 'bluebird'
import mongoose from 'mongoose'
import config from './config'

// Use bluebird
mongoose.Promise = Promise

// Initialize our db
mongoose.connect(config.databases.mongo)

const db = mongoose.connection
db.on('error', error => logger('server:mongoError')(error))
db.once('open', () => logger('server:mongo')(config.databases.mongo))

// Initialize our models
export default {
  connection: db,
  user: db.model('User', require('./models/user')),
  category: db.model('Category', require('./models/category')),
  product: db.model('Product', require('./models/product')),
}
