import express from 'express'
import { config, routes } from 'manage-users'
import { URI } from './mongo'

const app = express()
const { login, signup, changePassword } = routes
const { DB_DATABASE } = process.env

export const function isAuthenticated(req, res, next) {
  if (req.user) {
    return next()
  }

  return res.status(401).send({ message: 'Unauthorized' })
}

config.repositorySchemaBuilder()
  .setRepository('mongo')
  .setUri(URI)
  .setDatabaseName(DB_DATABASE)
  .setCollectionName('users')
  .build()

app.post('/login', login(), (req, res) => {
  res.send({ success: true, user: req.user })
})

app.post('/signup', signup(), (req, res) => {
  res.send({ success: true, response: res.locals.signup })
})

app.post('/changePassword', changePassword(), (req, res) => {
  res.send({ success: true })
})

app.get('*', (req, res) => {
  res.send('Users system')
})

export config

export routes

export default app
