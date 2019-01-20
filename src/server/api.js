import express from 'express'
import globby from 'globby'
import { getIndex, download } from './dropbox'
import dropboxFs from 'dropbox-fs'
import apicache from 'apicache'

import { collection } from './mongo'
import { isAuthenticated } from './users'

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
  getIndex().then(async (dropboxImages) => {
    let images = await collection('images')
                      .find({})
                      .catch(res.status(500).json)

    let existingIds = images.map(i => i.image_id)
    let dropboxIds = dropboxImages.map(i => i.id).filter(i => i)
    let changes = false

    for (var image_id of existingIds) {
      if (!dropboxIds.includes(id)) {
        console.log('deleting database and local content for image', id)
      }
    }

    for (var image_id of dropboxIds) {
      if (!existingIds.includes(image_id)) {
        await collection('images').update(image_id, { image_id })
        console.log('add database and local content for image', image_id)
        changes = true
      }
    }

    res.json(dropboxImages)
  })
})

app.get('/images', async (req, res) => {
  let images = await collection('images')
                      .find({})
                      .catch(res.status(500).json)

  res.json(images)
})

app.patch('/images/:image_id', async (req, res) => {
  let { image_id } = req.params
  let image = await collection('images')
                      .update(image_id, req.body)
                      .catch(res.status(400).json)

  res.json(image)
})

app.get('/images/:image_id', async (req, res) => {
  let { image_id } = req.params

  // insert doc
  await collection('images')
          .update(image_id, { image_id, bar: 'baz' })
          .catch(res.status(500).json)

  // get updated/created doc
  let doc = await collection('images')
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
