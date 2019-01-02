import fs from 'fs'
import sharp from 'sharp'
import Path from 'path'
import { download } from './dropbox'

const isProduction = process.env.NODE_ENV === 'production'

export const getImage = (requestedImagePath) => {
  return new Promise(async function(resolve, reject) {
    let decodedPath = decodeURI(requestedImagePath)
    let optionsSegment = decodedPath.replace(/^.*::(.*)\.\w{3,4}$/i, '$1') || ''
    let revisionId = decodedPath.replace(/.*?(\w+).*/g, '$1')
    let options = optionsSegment
                    .split(',')
                    .reduce((a, b) => {
                      let [ key, value ] = b.split('=')

                      if (value === undefined) {
                        a[key] = true
                      } else {
                        let numValue = Number(value)

                        a[key] = isNaN(numValue) ? value : numValue
                      }

                      return a
                    }, {})

    // begin: save final output and stream output to response
    let savefolder = Path.join(__dirname, `../${isProduction ? 'dist' : '.dist-dev'}/client/i`)
    let savepath = savefolder + requestedImagePath
    let originalpath = savefolder + '/' + revisionId + '.jpg'
    let saveoriginal = false

    let image = await fs.promises.readFile(originalpath)
                        .catch((err) => console.log('loading image from dropbox...'))

    if (!image) {
      image = await download(revisionId)
      console.log('loaded.')
      saveoriginal = true
    } else {
      console.log('original image loaded from local content')
    }

    if (!image) return reject('Image not found in database')

    image = sharp(image).rotate()

    if (saveoriginal) {
      image.toFile(originalpath)
    }

    let data = await image
      .resize({ width: options.width, height: options.height })
      .jpeg({
        quality: options.quality || 80,
      })
      .toFile(savepath)

    fs.promises.readFile(savepath)
      .then(resolve)
      .catch(reject)
    })
  })
})
