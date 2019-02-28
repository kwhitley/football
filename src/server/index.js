require('dotenv').config()

// include other main deps
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import session from 'express-session'
import sslRedirect from 'heroku-ssl-redirect'
import path from 'path'
import http from 'http'
import fs from 'fs'
import favicon from 'serve-favicon'
import { connectDatabase } from './db'
import { cacheWhenIdle, checkForUpdates } from './imager/cache-warmer'
import { clientPath } from './paths'
const morgan = require('morgan')

// API
import api from './api'
import imagerApi from './imager/api'
import usersApi from './users/api'

// instantiate express
const app = express()
const isProduction = process.env.NODE_ENV === 'production'

// force SSL on production
app.use(sslRedirect([
  'production',
]))

app.use(session({
  secret: 'my cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())

// add logging
app.use(morgan('dev'))

// static serving from /dist/client
console.log(`serving static content from ${clientPath}`)
app.use(express.static(clientPath))
app.use(favicon(path.join(__dirname, '../src/client/images', 'favicon.ico')))

// cache and sync collections when idle
app.use(cacheWhenIdle)

// add api layers
app.use('/api', api)
app.use('/user', usersApi)
app.use('/i', imagerApi)

// all other client requests that lack an extension redirected to client
app.get(/.*(?<!\.\w{1,4})$/, (req, res) => {
  console.log('redirecting request for', req.path, 'to', clientPath + '/index.html')
  res.sendFile('/index.html', { root: clientPath })
})

const serverPort = process.env.PORT || 3000
const server = http.createServer(app)

const initialize = async () => {
  await connectDatabase()

  // start the cache warmer
  checkForUpdates()

  // begin listening
  server.listen(serverPort)
  console.log(`Express server @ http://localhost:${serverPort} (${isProduction ? 'production' : 'development'})\n`)
}

initialize()
