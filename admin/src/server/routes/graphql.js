import router from 'koa-router'
import convert from 'koa-convert'
import graphqlHTTP from 'koa-graphql'
import config from './../config'
import schema from './../graphql'

export default router().use('/graphql', convert(graphqlHTTP({
  schema,
  graphiql: true
})))