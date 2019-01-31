import express from 'express'
import Blowfish from 'xs-blowfish'
import {
  isAuthenticated,
  isAdmin,
  validateUser,
  createUser,
  getUser,
  getUsersList,
} from './users'
import { getCollections } from '../collections/collections'
import { getHash, checkPassword } from './security'

const app = express()

const safeUserProfile = (user) => {
  let response = Object.assign({}, user)

  delete response._id
  delete response.apiKey
  delete response.password

  return response
}

app.get('/all', isAuthenticated, isAdmin, async (req, res) => {
  let users = await getUsersList()
    .catch((err) => res.status(400).json(err))

  console.log('users', users)

  res.json(users)
})

app.get('/profile', isAuthenticated, async (req, res) => {
  let { user } = req
  let response = safeUserProfile(user)
  response.collections = await getCollections({ owner: user._id })

  res.json(response)
})

app.get('/collections', isAuthenticated, async (req, res) => {
  let { user } = req
  let response = await getCollections({ owner: user._id })

  response ? res.json(response) : res.sendStatus(400)
})

app.get('/logout', (req, res) => {
  delete req.session.user

  res.sendStatus(200)
})

app.post('/login', async (req, res) => {
  let { email, password } = req.body

  if (!email || !password) {
    return res.sendStatus(400)
  }

  let user = await getUser({ email })
                    .then(users => users[0])
                    .catch(() => {
                      console.log('user not found with email', email)
                      res.sendStatus(401)
                    })

  if (user) {
    console.log('user found', user)
    let valid = await checkPassword(password, user.password)

    if (valid) {
      // decrpyt API token
      // let bf = new Blowfish(user.password)
      // user.apiKey = bf.decrypt(user.apiKey)

      // console.log('decrypted API key', user.apiKey)
      console.log('getting collections where', { owner: String(user._id) })
      let collections = await getCollections({ owner: String(user._id) })

      console.log('matching collections', collections)

      user.collections = collections
      req.session.user = user

      res.json(safeUserProfile(user))
    } else {
      res.sendStatus(401)
    }
  } else {
    res.sendStatus(401)
  }
})

app.post('/signup', async (req, res) => {
  let { email, password, passwordConfirmation, apiKey } = req.body

  if (!email || !password) {
    return res.sendStatus(400)
  }

  let existingUser = await getUser({ email })
                            .then(users => users[0])
                            .catch(() => {})

  if (existingUser) {
    return res.sendStatus(409)
  }

  password = await getHash(password)

  console.log('hash', password)

  // encrypt apiKey based on new password
  let bf = new Blowfish(password)
  console.log('apiKey', apiKey)
  apiKey = apiKey ? bf.encrypt(apiKey) : undefined
  console.log('encrypted apiKey', apiKey)

  await createUser({ email, password, apiKey }).catch(() => res.sendStatus(401))

  let user = await getUser({ email, password })
                    .then(users => users[0])
                    .catch(() => res.sendStatus(401))

  if (user) {
    req.session.user = user
    res.json(user)
  }
})

export default app
