import express from 'express'
import globby from 'globby'
import apicache from 'apicache'

import { collection } from './db'
import { isAuthenticated, isAdmin } from './users/users'
import collectionsApi from './collections/api'

// create an express app
const app = express()
const cache = apicache.middleware

app.use('/collections', collectionsApi)

app.get('/env', isAdmin, (req, res) => {
  res.json(process.env)
})

// 404
app.get('*', (req, res) => {
  res.sendStatus(404)
})

// export the express app
export default app
