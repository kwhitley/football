import { collection } from '../db'
import { isAuthenticated } from '../users/users'
import { getIndex } from '../imager/dropbox'

export const getImageIndex = async (req, res) => {
  let { slug } = req.params
  let col = await collection('collections')
                    .find({ slug })
                    .then(r => r[0])
                    .catch(err => console.error(err))

  if (!col) {
    return res.sendStatus(404)
  }

  getIndex(col.source.apiKey).then(async (dropboxImages) => {
    let images = await collection('images')
                      .find({})
                      .catch((err) => res.status(500).json(err))

    let existingIds = images.map(i => i.id)
    let dropboxIds = dropboxImages.map(i => i.id).filter(i => i)
    let changes = false

    for (var id of existingIds) {
      if (!dropboxIds.includes(id)) {
        await collection('images').remove({ id })
        console.log('deleting database and local content for image', id)
      }
    }

    for (var id of dropboxIds) {
      if (!existingIds.includes(id)) {
        await collection('images').update(id, { id })
        console.log('add database and local content for image', id)
        changes = true
      }
    }

    // get latest image list after patching
    if (changes) {
      images = await collection('images')
                      .find({})
                      .catch((err) => res.status(500).json(err))
    }

    dropboxImages = dropboxImages
      .map(dimage => Object.assign(dimage, images.find(i => i.id === dimage.id)))

    res.json(dropboxImages)
  })
  .catch(err => res.sendStatus(400))
}

export const getImage = async (req, res) => {
  let { id } = req.params

  // insert doc
  await collection('images')
          .update(id, { id, bar: 'baz' })
          .catch(res.status(500).json)

  // get updated/created doc
  let doc = await collection('images')
                    .find({ id })
                    .catch(res.status(500).json)

  res.json(doc)
}

export const updateImage = async (req, res) => {
  let { id } = req.params

  console.log('patching image', id, req.body)

  let image = await collection('images')
                      .update(id, req.body)
                      .then((response) => res.json(response))
                      .catch((err) => res.status(400).json(err))
}
