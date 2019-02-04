import fs from 'fs'
import sharp from 'sharp'
import Path from 'path'
import { getBaseImage } from './get-base-image'

const isProduction = process.env.NODE_ENV === 'production'

export const getImage = (requestedImagePath) => {
  // console.log('getImage:', requestedImagePath)
  return new Promise(async function(resolve, reject) {
    let decodedPath = decodeURI(requestedImagePath)
    let collectionId = decodedPath.replace(/\/([^\/]+).*/g, '$1')
    let optionsSegment = decodedPath.replace(/^.*::(.*)\.\w{3,4}$/i, '$1') || ''
    let revisionId = decodedPath.replace(/.*\/(\w+).*/g, '$1')
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

    // console.log('getImage', {
    //   requestedImagePath,
    //   decodedPath,
    //   collectionId,
    //   optionsSegment,
    //   revisionId,
    //   options,
    //   savefolder,
    //   savepath,
    // })

    let file = await getBaseImage(`/${collectionId}/${revisionId}.jpg`)
      .catch((err) => console.error('failure fetching image', err))

    try {
      var image = sharp(file).rotate()
    } catch(err) {
      console.log('error loading image', requestedImagePath, err)
      return false
    }

    if (options.preview) {
      if (options.width) {
        options.width = 75
      }

      if (options.height) {
        options.height = 75
      }

      if (!options.fit) {
        options.fit = (options.height && options.width ? 'cover' : 'inside'
      }

      options.quality = 70
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

    console.log('generated', requestedImagePath)

    fs.promises.readFile(savepath)
      .then(resolve)
      .catch(reject)
    })
  })
})
