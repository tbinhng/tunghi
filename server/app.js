
import express from 'express'
import graphqlHTTP from 'express-graphql'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'

import jwt from 'jsonwebtoken'
// import schema from './graphql'
import config from './config'
import cors from 'cors'

// Routes module
import setup from './routes/setup'
import auth from './routes/auth'

var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Enabled CORS request
app.use(cors());

app.use(setup)
// Authentication route
// app.use(auth)
// GraphqQL server route
// app.use('/graphql', graphqlHTTP(req => ({
//   schema,
//   pretty: true,
//   graphiql: true
// })));

app.use(morgan('dev'))

const port = process.env.PORT || config.http.port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})