import fs from 'fs'
import sharp from 'sharp'
import Path from 'path'
import { download } from './dropbox'

const isProduction = process.env.NODE_ENV === 'production'

// gets image locally, or downloads from dropbox and returns the saved image
export const getBaseImage = async (requestedImagePath) => {
  return new Promise(async function(resolve, reject) {
    let decodedPath = decodeURI(requestedImagePath)
    let revisionId = decodedPath.replace(/.*?(\w+).*/g, '$1')

    // begin: save final output and stream output to response
    let savefolder = Path.join(__dirname, `../../${isProduction ? 'dist' : '.dist-dev'}/client/i`)
    let savepath = savefolder + requestedImagePath
    let originalpath = savefolder + '/' + revisionId + '.jpg'

    let image = await fs.promises.readFile(originalpath)
                        .catch((err) => console.log('loading image from dropbox...'))

    if (!image) {
      let binary = await download(revisionId)

      console.log('making savefolder', savefolder)
      // ensure folder exists before file stream opening
      await fs.promises.mkdir(savefolder, { recursive: true }).catch(e => e)

      console.log('saving base image', originalpath)
      let image = await sharp(binary)
        .rotate()
        .jpeg({ quality: 95 })
        .toFile(originalpath)
    }

    console.log('returning', savepath)

    fs.promises.readFile(savepath)
      .then(resolve)
      .catch(reject)
    })
  }
}
