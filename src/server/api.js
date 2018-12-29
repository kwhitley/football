import express from 'express'
import globby from 'globby'
import { list, download } from './dropbox'
import dropboxFs from 'dropbox-fs'
import apicache from 'apicache'

// create an express app
const app = express()
const cache = apicache.middleware

// add a route
app.get('/tmp', async (req, res) => {
  const paths = await globby(['/Users/kevinwhitley/Documents/*.*']);

  res.json(paths)
})

app.get('/env', (req, res) => {
  res.json(process.env)
})

app.get('/list', cache('30 seconds'), (req, res) => {
  list().then((response) => res.json(response))
})

// export the express app
export default app
