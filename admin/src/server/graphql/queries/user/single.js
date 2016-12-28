import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { Types } from 'mongoose'

import userType from './../../types/user'
import { getProjection } from '../../../../utils'
import Account from './../../../models/Account'

export default {
  type: userType,
  args: {
    username: {
      name: 'username',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params, options) {
    const projection = getProjection(options.fieldASTs[ 0 ])

    return Account.find({username: params.username})
      .select(projection)
      .exec()
  }
}