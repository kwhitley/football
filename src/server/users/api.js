import express from 'express'
import { isAuthenticated, validateUser, createUser, getUser, getUsersList } from './users'

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

app.get('/profile', isAuthenticated, (req, res) => {
  res.json(req.session.user)
})

// app.get('/login', async (req, res) => {
//   createUser({
//     email: 'krwhitley@gmail.com',
//     username: 'krwhitley',
//     password: 'T5mvjFsIvy%#6KsipKLeiY@F@MS8a2',
//   }).then(() => res.sendStatus(200))
//     .catch((err) => res.status(400).json(err))

// })

app.get('/logout', (req, res) => {
  delete req.session.user

  res.sendStatus(200)
})

app.post('/login', async (req, res) => {
  let { email, password } = req.body

  if (!email || !password) {
    return res.sendStatus(400)
  }

  let user = await getUser({ email, password })
                    .then(users => users[0])
                    .then(user => {
                      delete user.password
                      delete user._id

                      return user
                    })
                    .catch(() => res.sendStatus(401))

  if (user) {
    req.session.user = user
    res.json(user)
  }
})

export default app
