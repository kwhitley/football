import { getIndex } from './dropbox'
import { getBaseImage } from './get-base-image'
import { getImage } from './imager.js'

const loadImages = async (images) => {
  for (var image of images) {
    await getBaseImage(`/${image.id}.jpg`)
    await getImage(`/${image.id}::width=400,height=400,preview.jpg`)
    await getImage(`/${image.id}::width=400,height=400.jpg`)
    await getImage(`/${image.id}::width=900,preview.jpg`)
    await getImage(`/${image.id}::width=900.jpg`)
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