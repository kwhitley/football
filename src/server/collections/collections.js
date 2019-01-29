import { collection } from '../db'

export const getCollectionsList = () => collection('collections').find({})

export const createCollection = (user) => async (content) => {
  content = Object.assign({
              dateCreated: new Date(),
              dateModified: new Date(),
              owner: user ? user._id : undefined,
            }, content)

  console.log('creating collection', content)

  return await collection('collections').create(content)
}

export const getCollections = async (match) => collection('collections').find(match)

export const isAvailable = async (slug) => collection('collections')
                                              .find({ slug })
                                              .then(r => !r.length)
                                              .catch((err) => console.error(err))



