import express from 'express'
import {
  createCollection,
  getCollection,
  getCollections,
  getCollectionList,
  getCollectionItems,
  syncCollection,
  isAvailable,
  addItemToCollection,
  removeItemFromCollection,
  updateItemInCollection,
} from './collections'
import { isAuthenticated } from '../users/users'
import db, { collection } from '../db'
import { getImageIndex, getImage, updateImage } from './images-api'

const app = express()

app.get('/', async (req, res) => {
  let result = await getCollections()

  if (!result) {
    return res.sendStatus(404)
  }

  res.json(result)
})

app.get('/:slug/items', async (req, res) => {
  let { slug, item } = req.params

  let items = await getCollectionItems({ slug })
                      .catch(err => console.error(err))

  items ? res.json(await items) : res.sendStatus(400)
})

app.get('/:slug/sync', async (req, res) => {
  let { slug } = req.params

  let syncResponse = await syncCollection({ slug })
                            .catch(err => console.error(err))

  return res.json(syncResponse)
  console.log('syncResponse = ', syncResponse)

  let response = await getCollection({ slug }).catch(err => console.error(err))

  response ? res.json(await response) : res.sendStatus(400)
})

app.get('/:slug/add/:item', async (req, res) => {
  let { slug, item } = req.params

  let update = await addItemToCollection(slug)(item)
                      .catch(err => console.error(err))

  let results = await getCollection({ slug })
                      .catch(err => res.sendStatus(500))

  res.json(await results)
})

app.get('/:slug/update/:item/:content', async (req, res) => {
  let { slug, item, content } = req.params
  let newContent = {
    item,
    content,
  }

  let update = await updateItemInCollection(slug)(newContent)
                      .catch(err => console.error(err))

  let results = await getCollection({ slug })
                      .catch(err => res.sendStatus(500))

  res.json(await results)
})

app.get('/:slug/remove/:item', async (req, res) => {
  let { slug, item } = req.params

  let update = await removeItemFromCollection(slug)(item)
                      .catch(err => res.sendStatus(500))
  let results = await getCollection({ slug })
                      .catch(err => res.sendStatus(500))

  res.json(results)
})

app.get('/:slug/remove/:item', async (req, res) => {
  let { slug, item } = req.params

  let update = await addItemToCollection(slug)(item)

  console.log('updated', slug, item, update)

  let results = await db('collections')
                      .find({ slug })
                      .toArray()
                      .catch(err => res.sendStatus(500))

  res.json(results)
})

app.get('/:slug', async (req, res) => {
  let { slug } = req.params
  let result = await getCollection({ slug })

  if (!result) {
    return res.sendStatus(404)
  }

  res.json(result)
})

// app.get('/:slug/items', getImageIndex)
app.get('/:slug/items/:id', getImage)
app.patch('/:slug/items/:id', updateImage)

app.get('/:slug/available', async (req, res) => {
  let available = await isAvailable(req.params.slug)

  res.sendStatus(available ? 200 : 409)
})

app.patch('/:slug', isAuthenticated, async (req, res) => {
  const collections = collection('collections')
  const { slug } = req.params
  const { user } = req

  await collections.update(slug, req.body)
          .catch((err) => {
            console.error(err)
            res.sendStatus(400)
          })

  let response = await getCollections({ slug })
  user.collections = await getCollections({ owner: String(user._id) })

  if (response) {
    res.json(response)
  } else {
    res.sendStatus(400)
  }
})

app.delete('/:slug', isAuthenticated, async (req, res) => {
  const collections = collection('collections')
  const { slug } = req.params
  const { user } = req

  let response = await collections.remove({ slug, owner: String(user._id) })
  user.collections = await getCollections({ owner: String(user._id) })

  // console.log('delete response', { slug }, response)

  if (response) {
    res.json(response)
  } else {
    res.sendStatus(400)
  }
})

app.post('/', isAuthenticated, async (req, res) => {
  let { name, slug } = req.body
  let { user } = req

  let available = await isAvailable(slug)

  if (!available) {
    return res.sendStatus(409)
  }

  let response = await createCollection(req.user)(req.body)
                          .catch((err) => {
                            console.error(err)
                            res.sendStatus(400)
                          })

  user.collections = await getCollections({ owner: String(user._id) })

  if (response) {
    res.json(response.ops[0])
  } else {
    res.sendStatus(400)
  }
})

export default app
