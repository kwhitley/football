import { getIndex } from './dropbox'
import { getBaseImage } from './get-base-image'

const loadImages = async (images) => {
  for (var image of images) {
    await getBaseImage(`/${image.id}.jpg`)
  }

  console.log('image loads complete.')
}

export const cacheWarmer = async () => {
  console.log('warming the cache...')
  await getIndex()
    .then((entries) => {
      loadImages(entries.filter(e => e.type === 'file'))

      return entries
    })
}
