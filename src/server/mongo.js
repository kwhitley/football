import { MongoClient } from 'mongodb'

const {
  DB_USER,
  DB_PASSWORD,
  DB_CLUSTER,
  DB_DATABASE,
} = process.env

const connectionStr = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@personal-gallery-8rxci.gcp.mongodb.net/test?retryWrites=true`

let database = undefined

MongoClient
  .connect(connectionStr, { useNewUrlParser: true })
  .then((client) => {
    console.log('connected to database.')
    database = client.db(DB_DATABASE)
  })
  .catch(console.error)

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
