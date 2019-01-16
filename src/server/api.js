import express from 'express'
import globby from 'globby'
import { getIndex, download } from './dropbox'
import dropboxFs from 'dropbox-fs'
import apicache from 'apicache'

import { collection } from './mongo'

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
  getIndex().then((response) => res.json(response))
})

app.get('/images', async (req, res) => {
  let imageCollection = await collection('images')
                                .catch(res.status(500).json)
  let images = await imageCollection
                      .find({})
                      .catch(res.status(500).json)

  res.json(images)
})

app.get('/images/:image_id', async (req, res) => {
  let { image_id } = req.params
  let imageCollection = await collection('images')
                                .catch(res.status(500).json)

  // insert doc
  await imageCollection
          .update(image_id, { image_id, bar: 'baz' })
          .catch(res.status(500).json)

  // get updated/created doc
  let doc = await imageCollection
                    .find({ image_id })
                    .catch(res.status(500).json)

  res.json(doc)
})

// 404
app.get('*', (req, res) => {
  res.sendStatus(404)
})

// export the express app
export default app
