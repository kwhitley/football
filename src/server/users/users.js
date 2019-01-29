import { collection } from '../db'
import { getHash, checkPassword } from './security'

export const getUsersList = () => collection('users').find({})

export const createUser = async (profile) =>
  await collection('users')
    .create(Object.assign({
      dateCreated: new Date()
    }, profile))

export const getUser = async (match) => collection('users').find(match)

export const isAuthenticated = (req, res, next) =>
  req.session.user
  ? (req.user = req.session.user) && next()
  : res.sendStatus(401)

export const isAdmin = (req, res, next) =>
  req.session.user & req.session.user.email === 'krwhitley@gmail.com'
  ? next()
  : res.sendStatus(401)
