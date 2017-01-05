import express from 'express'
import graphqlHTTP from 'express-graphql'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'

// import schema from './graphql'
import config from './config'

// Routes module
import setupRoute from './routes/setup'
import authRoutes from './routes/auth'

var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Enabled CORS request
app.use(cors());

// Compacting requests using GZIP middleware
app.use(compression())

app.use(setupRoute)
// Authentication routes
app.use('/api/auth', authRoutes)
// GraphqQL route
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