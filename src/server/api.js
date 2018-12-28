import express from 'express'
import globby from 'globby'
import { list, download } from './dropbox'
import dropboxFs from 'dropbox-fs'

// create an express app
const app = express()

// add a route
app.get('/tmp', async (req, res) => {
  const paths = await globby(['/Users/kevinwhitley/Documents/*.*']);

  res.json(paths)
})

app.get('/env', (req, res) => {
  res.json(process.env)
})

app.get('/list', (req, res) => {
  list().then((response) => res.json(response))
})

// export the express app
export default app
