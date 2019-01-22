import express from 'express'
import Blowfish from 'xs-blowfish'
import { isAuthenticated, validateUser, createUser, getUser, getUsersList } from './users'
import { getHash, checkPassword } from './security'

const app = express()

// app.post('/signup', async (req, res) => {
//   let user = await createUser(req.body)

//   if (user) {
//     res.json(req.session.user)
//   }
// })

app.get('/all', isAuthenticated, async (req, res) => {
  let users = await getUsersList()
    .catch((err) => res.status(400).json(err))

  console.log('users', users)

  res.json(users)
})

app.get('/hash/:password', async (req, res) => {
  let hash = await getHash(req.params.password)

  res.send(hash)
})

app.get('/profile', isAuthenticated, (req, res) => {
  res.json(req.session.user)
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

      delete user.password
      delete user._id
      delete user.apiKey

      req.session.user = user
      res.json(user)
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
                    .then(user => {
                      delete user.password
                      delete user._id
                      delete user.apiKey

                      return user
                    })
                    .catch(() => res.sendStatus(401))

  if (user) {
    req.session.user = user
    res.json(user)
  }
})

export default app
