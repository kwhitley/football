import path from 'path'

const isProduction = process.env.NODE_ENV === 'production'
const isDevelop = process.env.NODE_ENV === 'development'

console.log('NODE_ENV=', process.env.NODE_ENV)
console.log('isProduction=', isProduction)
console.log('isDevelop=', isDevelop)

export const serverPath = path.join(__dirname, `../${isDevelop ? '.dist-dev' : 'dist'}`)
export const clientPath = serverPath + '/client'
export const imagePath = clientPath + '/i'
