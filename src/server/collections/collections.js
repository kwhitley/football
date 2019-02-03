import db from '../db'
import { getIndex } from '../imager/dropbox'

export const createCollection = (user) => async (content) => {
  if (!user || !user._id) {
    return false
  }

  // extend content with dates and owner
  content = Object.assign({
              dateCreated: new Date(),
              dateModified: new Date(),
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

export const isAvailable = (slug) => db('collections')
                                      .findOne({ slug })
                                      .then(r => !r)

export const addItemToCollection = ({ slug, owner }) => (item) => {
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

export const updateItemInCollection = ({ slug, owner }) => (id) => (content) => {
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
        'items.id': id,
      },
      {
        $set: updateify(content),
      }
    )
}

export const getCollection = (where = {}) => db('collections').findOne(where)

export const getCollections = (where = {}) => db('collections')
                                                .find(where, {
                                                  items: 0,
                                                })
                                                .toArray()

export const getCollectionList = (where = {}) => db('collections')
                                          .find(where)
                                          .toArray()

export const getCollectionItems = (where = {}) => db('collections')
                                          .findOne(where)
                                          .then(r => r.items || [])

export const getCollectionItem = (where = {}) => (itemWhere = {}) => db('collections')
                                          .findOne(where, { foo: 1, dateCreated: 0 })
                                          .then(r => r.items || [])

export const syncCollection = async (where = {}) => {
  try {
    let collection = await getCollection(where)
    let collectionItems = collection.items || []

    console.log('collection', where, '-->', collection)
    let { source, owner, slug } = collection

    if (!source || !source.apiKey) return false

    let dropboxItems = await getIndex(source.apiKey) || []

    for (var dbItem of dropboxItems) {
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
    throw new Error(err)
  }
}
