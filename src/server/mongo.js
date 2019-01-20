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

const find = (collection) => {
  return (match) => {
    return new Promise((resolve, reject) => {
      collection
        .find(match)
        .toArray(function(err, data) {
          err
            ? reject(err)
            : resolve(data);
         })
    }
  })
}

const update = (collection) => {
  return (image_id, update = {}) => {
    return new Promise((resolve, reject) => {
      collection
        .update(
          { image_id },
          update,
          { upsert: true },
          (err, status) => {
            err
              ? reject(err)
              : resolve(status)
          },
        )
    }
  })
}

export const collection = (name) => {
  return {
    find: find(database.collection(name)),
    update: update(database.collection(name)),
  }
}
