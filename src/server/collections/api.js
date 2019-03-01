import express from 'express'
import {
  createCollection,
  getCollection,
  updateCollection,
  getCollections,
  getCollectionList,
  getCollectionItem,
  getCollectionItems,
  syncCollection,
  isAvailable,
  addItemToCollection,
  removeItemFromCollection,
  updateItemInCollection,
} from './collections'
import { isAuthenticated } from '../users/users'
import db, { collection } from '../db'
import apicache from 'apicache'

const app = express()
const cached = apicache.options({
                debug: process.env.NODE_ENV !== 'production',
                enabled: false,
              }).middleware('1 day')

const cleanItems = (item) => {
  delete item.filename
  delete item.id
  delete item.size

  if (item.collection) {
    delete item.collection.source
  }

  return item
}

app.use('/:slug', (req, res, next) => {
  req.apicacheGroup = req.params.slug

  next()
})

app.get('/cache', (req, res) => {
  res.json(apicache.getIndex())
})

// GET colections index
app.get('/', cached, async (req, res) => {
  req.apicacheGroup = 'collections'
  let result = await getCollections()

  if (!result) {
    return res.sendStatus(404)
  }

  res.json(result)
})

// GET collection
app.get('/:slug', cached, async (req, res) => {
  let { slug } = req.params
  let key = slug.length === 5 ? 'hash' : 'slug'

  let result = await getCollection({ [key]: slug })

  if (!result) {
    return res.sendStatus(404)
  }

  delete result.source
  delete result.owner
  result.items = result.items.map(cleanItems) || []

  res.json(result)

  // let syncResponse = await syncCollection({ slug })
  //                           .catch(err => console.error(err))
})

// PATCH collection update
app.patch('/:slug', isAuthenticated, async (req, res) => {
  const collections = collection('collections')
  const { slug } = req.params
  const { user } = req
  let key = slug.length === 5 ? 'hash' : 'slug'

  console.log('updating collection', slug, req.body)

  let updateSuccess = await updateCollection({ [key]: slug, owner: user._id })(req.body)
                              .catch((err) => {
                                console.error(err)
                              })

  if (updateSuccess) {
    apicache.clear(req.apicacheGroup)
  }

  res.sendStatus(updateSuccess ? 200 : 400)
})

// DELETE collection
app.delete('/:slug', isAuthenticated, async (req, res) => {
  const collections = collection('collections')
  const { slug } = req.params
  const { user } = req
  let key = slug.length === 5 ? 'hash' : 'slug'

  let response = await collections.remove({ [key]: slug, owner: String(user._id) })
  user.collections = await getCollections({ owner: String(user._id) })

  if (response) {
    res.json(response)
  } else {
    res.sendStatus(400)
  }
})

// GET collection items
app.get('/:slug/items', cached, async (req, res) => {
  let { slug, item } = req.params
  let key = slug.length === 5 ? 'hash' : 'slug'

  let collection = await getCollection({ [key]: slug })
                      .catch(err => console.error(err))

  collection ? res.json(collection.items.map(cleanItems)) : res.sendStatus(404)
})

// GET collection item (single) by id
app.get('/:slug/items/:hash', cached, async (req, res) => {
  let { slug, hash } = req.params
  let key = slug.length === 5 ? 'hash' : 'slug'

  let item = await getCollectionItem({ [key]: slug })({ hash })
                          .then(cleanItems)
                          .catch(err => console.error(err))

  return item
    ? res.json(item)
    : res.sendStatus(404)
})

// PATCH collection item (single) by id
app.patch('/:slug/items/:id', isAuthenticated, async (req, res) => {
  let { slug, id } = req.params
  let { user } = req
  let key = slug.length === 5 ? 'hash' : 'slug'

  console.log('updating', { slug, id, update: req.body })

  let updateSuccess = await updateItemInCollection({ [key]: slug, owner: user._id })(id)(req.body)
                      .catch(err => console.error(err))

  if (updateSuccess) {
    apicache.clear(req.apicacheGroup)
  }

  res.sendStatus(updateSuccess ? 200 : 400)
})

// GET collection sync (trigger)
app.get('/:slug/sync', async (req, res) => {
  let { slug } = req.params
  let key = slug.length === 5 ? 'hash' : 'slug'

  let syncResponse = await syncCollection({ [key]: slug })
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

// POST collection
app.post('/', isAuthenticated, async (req, res) => {
  let { slug } = req.body
  let { user } = req

  let available = await isAvailable(slug)

  if (!available) {
    return res.sendStatus(409)
  }

  let response = await createCollection(user)(req.body)
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
