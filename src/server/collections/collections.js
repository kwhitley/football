import db from '../db'
import { getIndex } from '../imager/dropbox'
import { generateHash } from '../utils'

const getImagePath = (collection) => (item) => `/i/${collection.hash}/${item.hash}`

export const createCollection = (user) => async (content) => {
  if (!user || !user._id) {
    return false
  }

  // extend content with dates and owner
  content = Object.assign({
              dateCreated: new Date(),
              dateModified: new Date(),
              hash: generateHash(5),
              owner: user._id,
            }, content)

  console.log('creating collection', content)

  return db('collections').insertOne(content)
}

export const updateCollection = ({ slug, owner }) => (content) =>
  db('collections')
    .updateOne(
      { slug, owner },
      { $set: content }
    )
    .then(r => r.result.nModified === 1)

export const isAvailable = (slug) => db('collections')
                                      .findOne({ slug })
                                      .then(r => !r)

export const addItemToCollection = ({ slug, owner }) => (item = {}) => {
  if (!item.hash) {
    item.hash = generateHash(3)
  }

  console.log('adding item to collection', slug, item)

  return db('collections')
    .updateOne(
      {
        slug,
        owner,
        'items.item.id': { $ne: item.id },
      },
      {
        $addToSet: { items: item },
      }
    )
}

export const removeItemFromCollection = ({ slug, owner }) => (where) =>
  db('collections')
    .updateMany(
      { slug, owner },
      {
        $pull: {
          items: where,
        }
      }
    )

export const updateItemInCollection = ({ slug, owner }) => (hash) => (content) => {
  const updateify = (content) => {
    let base = Object.keys(content).reduce((obj, key) => {
      obj[`items.$.${key}`] = content[key]

      return obj
    }, {})

    base['items.$.dateModified'] = new Date()

    console.log('updateify', content, base)

    return base
  }


  return db('collections')
    .updateOne(
      {
        slug,
        owner,
        'items.hash': hash,
      },
      {
        $set: updateify(content),
      }
    )
    .then(r => r.result.nModified === 1)
}

export const getCollection = (where = {}) => db('collections')
                                                .findOne(where)
                                                .then(r => {
                                                  if (!r) {
                                                    return undefined
                                                  }

                                                  if (!r.items) {
                                                    r.items = []
                                                  }

                                                  r.items.map(i => {
                                                    i.imagePath = getImagePath(r)(i)

                                                    return i
                                                  })

                                                  return r
                                                })

export const getCollectionItems = (where = {}) => getCollection(where).then(r => r.items)


export const getCollections = (where = {}) => db('collections')
                                                .find(where, {
                                                  projection: {
                                                    items: 0,
                                                    source: 0,
                                                  },
                                                })
                                                .toArray()

export const getCollectionList = (where = {}) => db('collections')
                                          .find(where)
                                          .toArray()

export const getCollectionItem = (where = {}) => (itemWhere = {}) => {
  let options = {
                  projection: {
                    hash: 1,
                    slug: 1,
                    name: 1,
                    source: 1,
                    items: { $elemMatch: itemWhere },
                  }
                }

  return db('collections')
    .findOne(where, options)
    .then(collection => {
      if (!collection.items) {
        return undefined
      }

      let item = collection.items[0]
      let { name, hash, slug, source } = collection

      item.collection = { name, hash, slug, source }
      item.imagePath = getImagePath(collection)(item)

      return item
    })
}

export const syncCollection = async (where = {}) => {
  try {
    console.log('syncing collection', where)
    let collection = await getCollection(where)
    let collectionItems = collection.items || []

    let { source, owner, slug } = collection

    if (!source || !source.apiKey) return false

    let dropboxItems = await getIndex(source.apiKey) || []

    for (var dbItem of dropboxItems) {
      /*
        match by:
        1 - id (only)
        2 - filename + folder (both)
        3 - size + filename + folder (any 2?)
      */
      if (!collectionItems.find(i => i.id === dbItem.id)) {
        console.log('id', dbItem.id, 'not found in collection... inserting', dbItem)
        await addItemToCollection({ slug, owner })(dbItem)
      }
    }

    for (var collectionItem of collectionItems) {
      if (!dropboxItems.find(i => i.id === collectionItem.id)) {
        console.log('id', collectionItem.id, 'not found in dropbox... removing from collection/archiving')
        removeItemFromCollection({ slug, owner })({ id: collectionItem.id })
        // TODO: clean up files
      }
    }

    return {
      collectionItems,
      dropboxItems,
    }

  } catch(err) {
    console.error('error syncing', err)
    return false
  }
}
