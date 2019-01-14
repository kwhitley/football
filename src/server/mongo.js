import { MongoClient } from 'mongodb'

console.log('loading mongo interface')

const {
  DB_USER,
  DB_PASSWORD,
  DB_CLUSTER,
  DB_DATABASE,
} = process.env

const connectionStr = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@personal-gallery-8rxci.gcp.mongodb.net/test?retryWrites=true`

// Connect to your MongoDB instance(s)
export const getDatabase = () =>
  MongoClient
    .connect(connectionStr, { useNewUrlParser: true })
    .then(client => client.db(DB_DATABASE))
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
  return (id, update = {}) => {
    return new Promise((resolve, reject) => {
      collection
        .update(
          { id },
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

export const collection = async (name) => {
  let db = await getDatabase()
  let col = db.collection(name)

  return {
    find: find(col),
    update: update(col),
  }
}
