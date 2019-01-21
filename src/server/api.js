import express from 'express'
import globby from 'globby'
import { getIndex, download } from './imager/dropbox'
import dropboxFs from 'dropbox-fs'
import apicache from 'apicache'

import { collection } from './db'
import { isAuthenticated } from './users/users'

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

app.get('/images', cache('30 seconds'), (req, res) => {
  getIndex().then(async (dropboxImages) => {
    let images = await collection('images')
                      .find({})
                      .catch((err) => res.status(500).json(err))

    let existingIds = images.map(i => i.id)
    let dropboxIds = dropboxImages.map(i => i.id).filter(i => i)
    let changes = false

    for (var id of existingIds) {
      if (!dropboxIds.includes(id)) {
        await collection('images').remove({ id })
        console.log('deleting database and local content for image', id)
      }
    }

    for (var id of dropboxIds) {
      if (!existingIds.includes(id)) {
        await collection('images').update(id, { id })
        console.log('add database and local content for image', id)
        changes = true
      }
    }

    // get latest image list after patching
    if (changes) {
      images = await collection('images')
                      .find({})
                      .catch((err) => res.status(500).json(err))
    }

    dropboxImages = dropboxImages
      .map(dimage => Object.assign(dimage, images.find(i => i.id === dimage.id)))

    res.json(dropboxImages)
  })
})

app.patch('/images/:id', isAuthenticated, async (req, res) => {
  let { id } = req.params

  console.log('patching image', id, req.body)
  // res.json(req.body)
  let image = await collection('images')
                      .update(id, req.body)
                      .then((response) => res.json(response))
                      .catch((err) => res.status(400).json(err))

  // res.json({ success: true })
})

app.get('/images/:id', async (req, res) => {
  let { id } = req.params

  // insert doc
  await collection('images')
          .update(id, { id, bar: 'baz' })
          .catch(res.status(500).json)

  // get updated/created doc
  let doc = await collection('images')
                    .find({ id })
                    .catch(res.status(500).json)

  res.json(doc)
})

// 404
app.get('*', (req, res) => {
  res.sendStatus(404)
})

// export the express app
export default app
