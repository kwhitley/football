import { MongoClient } from 'mongodb'

const {
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_URI,
} = process.env

const shards = (uri) => Array(3).fill(0).map((v,i) => uri.replace(/^(.*)?-(.*)$/, `$1-shard-00-0${i}-$2`))
const replicaSet = (uri) => uri.replace(/^(.*)?-(.*)$/, `$1-shard-0`)

export const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${shards(DB_URI).join(',')}/${DB_DATABASE}?replicaSet=${replicaSet(DB_URI)}&ssl=true&authSource=admin`

let database = undefined

MongoClient
  .connect(URI, { useNewUrlParser: true })
  .then((client) => {
    console.log('connected to database.')
    database = client.db(DB_DATABASE)
  })
  .catch((err) => {
    console.log('error', err)
  })

const find = (collection) => (match) =>
  collection
    .find(match)
    .toArray()

const remove = (collection) => (condition) => {
  console.log('deleting from', collection, 'where', condition)
  return collection.deleteOne(condition || { safe: true })
}

const create = (collection) => (content = {}) => collection.insertOne(content)

const update = (collection) =>
  (slug, content = {}) =>
    collection
      .updateOne(
        { slug },
        { $set: content },
        // { upsert: true },
      )
      .then(find(collection)({ slug }))

export const collection = (name) => {
  return {
    create: create(database.collection(name)),
    find: find(database.collection(name)),
    update: update(database.collection(name)),
    remove: remove(database.collection(name)),
  }
}
