import { collection } from '../db'

export const getUsersList = () => collection('users').find({})

export const createUser = async ({ email, password, username }) =>
  await collection('users')
    .create({
      email,
      password,
      username,
      dateCreated: new Date(),
    })

export const getUser = async (match) => collection('users').find(match)

export const isAuthenticated = (req, res, next) =>
  req.session.user
  ? next()
  : res.sendStatus(401)
