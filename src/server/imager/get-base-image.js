import fs from 'fs'
import sharp from 'sharp'
import Path from 'path'
import { download } from './dropbox'
import { getCollection, getCollectionItem } from '../collections/collections'
import { imagePath } from '../paths'

// gets image locally, or downloads from dropbox and returns the saved image
export const getBaseImage = async (requestedImagePath) => {
  console.log('getBaseImage', { requestedImagePath })
  return new Promise(async function(resolve, reject) {
    // trim requests if passed through as root /i/hash/hash style
    requestedImagePath = requestedImagePath.replace(/^\/i(\/.*)$/,'$1')

    // begin decoding the request path
    let decodedPath = decodeURI(requestedImagePath)
    let collectionHash = decodedPath.replace(/\/([^\/]+).*/g, '$1')
    let hash = decodedPath.replace(/.*\/(\w+).*/g, '$1')

    // begin: save final output and stream output to response
    let savepath = imagePath + requestedImagePath
    let originalpath = imagePath + '/' + collectionHash + '/' + hash + '.jpg'

    // console.log('getBaseImage', {
    //   requestedImagePath,
    //   decodedPath,
    //   collectionHash,
    //   hash,
    //   savepath,
    //   originalpath,
    // })

    // throw new Error('exit')

    let image = await fs.promises.readFile(originalpath)
                        .catch((err) => console.log('loading image from dropbox...'))

    // download image from dropbox if not found base locally
    if (!image) {
      let item = await getCollectionItem({ hash: collectionHash })({ hash })

      if (!item) {
        return reject('no item found with', { collectionHash, hash })
      }

      let { collection } = item
      // console.log('item found', item)

      let { source } = collection
      let binary = await download(source.apiKey, item.id)

      // ensure folder exists before file stream opening
      await fs.promises.mkdir(imagePath + '/' + collectionHash, { recursive: true }).catch(e => e)

      console.log('saving base image', originalpath)
      let image = await sharp(binary)
        .rotate()
        .jpeg({ quality: 95 })
        .toFile(originalpath)
    }

    // console.log('returning', savepath)

    fs.promises.readFile(savepath)
      .then(resolve)
      .catch(reject)
    })
  }
}
