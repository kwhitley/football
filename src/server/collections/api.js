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

app.patch('/:id', isAuthenticated, async (req, res) => {
  const collections = collection('collections')
  const { id } = req.body

  await collections.update(id, req.body)
          .catch((err) => {
            console.error(err)
            res.sendStatus(400)
          })

  let collection = await getCollection({ _id: id })

  if (collection) {
    res.json(collection)
  } else {
    res.sendStatus(400)
  }
})

app.delete('/:id', isAuthenticated, async (req, res) => {
  const collections = collection('collections')
  const { id } = req.params
  const { user } = req

  let response = await collections
                        .remove({ slug: id, owner: user._id })


  console.log('delete response', { id }, response)

  if (response) {
    res.json(response)
  } else {
    res.sendStatus(400)
  }
})

app.post('/', isAuthenticated, async (req, res) => {
  let { name, slug } = req.body
  let { user } = req

  let available = await getCollection({ slug }).then(match => !match.length)

  if (!available) {
    return res.sendStatus(409)
  }

  let response = await createCollection(req.user)(req.body)
                          .catch((err) => {
                            console.error(err)
                            res.sendStatus(400)
                          })

  if (response) {
    res.json(response)
  } else {
    res.sendStatus(400)
  }
})

export default app
