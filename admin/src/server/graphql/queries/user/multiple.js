import {
  GraphQLList
} from 'graphql'
import { Types } from 'mongoose'

import userType from './../../types/user'
import { getProjection } from '../../../../utils'
import Account from './../../../models/Account'

export default {
  type: new GraphQLList(userType),
  resolve(root, params, options) {
    const projection = getProjection(options.fieldASTs[ 0 ])

    return Account.find().select(projection).exec()
  }
}