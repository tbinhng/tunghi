import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql'

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
    token: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    }
  }
})