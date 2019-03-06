import express from '@supergeneric/express-server'

import { connectDatabase } from './db'
import { cacheWhenIdle, checkForUpdates } from './imager/cache-warmer'

// API
import api from './api'
import imagerApi from './imager/api'
import usersApi from './users/api'

// instantiate express
const app = express()

// cache and sync collections when idle
app.use(cacheWhenIdle)

// add api layers
app.use('/api', api)
app.use('/user', usersApi)
app.use('/i', imagerApi)

const initialize = async () => {
  await connectDatabase()

  // start the cache warmer
  checkForUpdates()

  // begin listening
  app.start()
}

initialize()
