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

const app = express()

// GET colections index
app.get('/', async (req, res) => {
  let result = await getCollections()

  if (!result) {
    return res.sendStatus(404)
  }

  res.json(result)
})

// GET collection
app.get('/:slug', async (req, res) => {
  let { slug } = req.params

  let result = await getCollection({ slug })

  if (!result) {
    return res.sendStatus(404)
  }

  delete result.source
  delete result.owner
  result.items = result.items || []
  result.items = result.items.map(i => {
    delete i.filename
    delete i.size

    return i
  })

  res.json(result)

  let syncResponse = await syncCollection({ slug })
                            .catch(err => console.error(err))
})

// GET collection items
app.get('/:slug/items', async (req, res) => {
  let { slug, item } = req.params

  let items = await getCollectionItems({ slug })
                      .catch(err => console.error(err))

  items ? res.json(await items) : res.sendStatus(400)
})

// GET collection item (single) by id
app.get('/:slug/items/:id', async (req, res) => {
  let { slug, id } = req.params

  let allItems = await getCollectionItems({ slug })
                        .catch(err => console.error(err))

  res.json(allItems.find(i => i.id === id))
})

// PATCH collection item (single) by id
app.patch('/:slug/items/:id', isAuthenticated, async (req, res) => {
  let { slug, id } = req.params
  let { user } = req
  let content = req.body

  let update = await updateItemInCollection({ slug, owner: user._id })(id)(content)
                      .catch(err => console.error(err))

  let results = await getCollection({ slug })
                      .catch(err => res.sendStatus(500))

  res.json(await results)
})

// GET collection sync (trigger)
app.get('/:slug/sync', async (req, res) => {
  let { slug } = req.params

  let syncResponse = await syncCollection({ slug })
                            .catch(err => console.error(err))

  return res.json(syncResponse)
  console.log('syncResponse = ', syncResponse)

  let response = await getCollection({ slug }).catch(err => console.error(err))

  response ? res.json(await response) : res.sendStatus(400)
})

// GET collection name is available (returns 200 || 409)
app.get('/:slug/available', async (req, res) => {
  let available = await isAvailable(req.params.slug)

  res.sendStatus(available ? 200 : 409)
})

// PATCH collection update
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

// DELETE collection
app.delete('/:slug', isAuthenticated, async (req, res) => {
  const collections = collection('collections')
  const { slug } = req.params
  const { user } = req

  let response = await collections.remove({ slug, owner: String(user._id) })
  user.collections = await getCollections({ owner: String(user._id) })

  if (response) {
    res.json(response)
  } else {
    res.sendStatus(400)
  }
})

// POST collection
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
