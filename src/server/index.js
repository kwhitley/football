require('dotenv').config()

// include other main deps
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import path from 'path'
import http from 'http'
import fs from 'fs'
import favicon from 'serve-favicon'

import api from './api'
import imager from './imager-api'

// instantiate express
const app = express()
const isProduction = process.env.NODE_ENV === 'production'
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())

// static serving from /dist/client
const staticPath = path.join(__dirname, `../${isProduction ? 'dist' : '.dist-dev'}/client`)
console.log(`serving static content from ${staticPath}`)
app.use(express.static(staticPath))
app.use(favicon(path.join(__dirname, '../src/client/images', 'favicon.ico')))

// add api layers
app.use('/api', api)
app.use('/i', imager)

const serverPort = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(serverPort)
console.log(`Express server @ http://localhost:${serverPort} (${isProduction ? 'production' : 'development'})\n`)
