import bcrypt from 'bcryptjs'

const saltRounds = 8

export const getHash = (password) => bcrypt.hash(password, saltRounds)

export const checkPassword = (password, hash) => bcrypt.compare(password, hash)
