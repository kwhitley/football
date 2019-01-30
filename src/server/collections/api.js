import express from 'express'
import { createCollection, getCollections, getCollectionsList, isAvailable } from './collections'
import { isAuthenticated } from '../users/users'
import { collection } from '../db'
import { ObjectId } from 'mongodb'

const app = express()

app.get('/', async (req, res) => {
  let list = await getCollectionsList()
    .catch((err) => res.status(400).json(err))

  res.json(list)
})

app.get('/:slug', async (req, res) => {
  const { slug } = req.params

  await getCollections({ slug })
          .then(r => r.length ? res.json(r[0]) : res.sendStatus(404))
          .catch((err) => res.status(400).json(err))
})

app.get('/check-availability/:slug', async (req, res) => {
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
