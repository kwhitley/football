import { randomItem } from 'supergeneric/collections'

let alpha = 'abcdefghijklmnopqrstuvxyz'
let upper = alpha.toUpperCase()
let numeric = '0123456789'

export const generateHash = (length) => Array(length).fill(0).map((v, index) => {
  return index
          ? randomItem(alpha + upper + numeric)
          : randomItem(alpha + upper)
}).join('')
