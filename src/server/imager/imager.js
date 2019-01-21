import fs from 'fs'
import sharp from 'sharp'
import Path from 'path'
import { download } from './dropbox'
import { getBaseImage } from './get-base-image'

const isProduction = process.env.NODE_ENV === 'production'

export const getImage = (requestedImagePath) => {
  console.log('getImage:', requestedImagePath)
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
    let savefolder = Path.join(__dirname, `../../${isProduction ? 'dist' : '.dist-dev'}/client/i`)
    let savepath = savefolder + requestedImagePath
    let file = await getBaseImage(`/${revisionId}.jpg`)
      .catch((err) => console.error('failure fetching image', err))

    let image = sharp(file).rotate()

    if (options.preview) {
      if (options.width) {
        options.width = 75
      }

      if (options.height) {
        options.height = 75
      }

      options.quality = 70
      options.fit = (options.height && options.width ? 'cover' : 'inside'

      console.log('generating preview', options)
    } else {
      console.log('generating fragment', options)
    }

    let data = await image
      .resize({
        width: options.width,
        height: options.height,
        fit: options.fit || 'cover',
      })
      .jpeg({
        quality: options.quality || 90,
      })
      .toFile(savepath)

    fs.promises.readFile(savepath)
      .then(resolve)
      .catch(reject)
    })
  })
})