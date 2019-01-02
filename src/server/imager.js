import gm from 'gm'
import fs from 'fs'
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

    console.log('IMAGER', {
      decodedPath,
      optionsSegment,
      savepath,
      originalpath,
      options,
      revisionId,
    })

    if (options.width && options.height) {
      options.targetRatio = options.width / options.height
      if (!options.background && !options.fit) {
        options.crop = true
      }
    }

    // ensure folder exists before file stream opening
    await fs.promises.mkdir(savefolder, { recursive: true }).catch(e => e)

    let image = await fs.promises.readFile(originalpath).catch(console.error)

    if (!image) {
      image = await download(revisionId)
      console.log('image file loaded from dropbox')

      console.log(`saving original to ${originalpath}...`)
      saveoriginal = true
      // fs.promises.writeFile(originalpath, image)
      //   .then(() => console.log('original file saved to', originalpath))
      //   .catch(console.error)
    } else {
      console.log('image binary loaded from local content', image)
    }

    if (!image) return reject('Image not found in database')

    gm(image).autoOrient().toBuffer(function (err, buffer) {
      console.log('buffer', buffer)

      gm(buffer).size(async function(err, geometry) {
        err && console.log('geometry.error', err)

        let gmImage = gm(buffer)

        if (!geometry) {
          console.error(`Image geometry not found for ${requestedImagePath}`)
          return reject(`Image geometry not found for ${requestedImagePath}`)
        }

        if (saveoriginal) {
          gmImage.write(originalpath, (err) => {
            if (err) {
              console.error('error saving original', err)
            } else {
              console.log('original saved to', originalpath)
            }
          })
        }

        let { height, width } = geometry

        if (err) {
          return reject(err)
        }

        let actualRatio = width / height

        gmImage.setFormat('jpg')

        // black and white filter
        if (options.mono) {
          gmImage.type('GrayScale')
        }

        // negative filter
        if (options.negative) {
          gmImage.negative()
        }

        if (options.crop) {
          let rw, rh
          let center = options.center !== undefined ? parseFloat(options.center, 10) : 0.5
          let tx = 0
          let ty = 0

          if (actualRatio > options.targetRatio) {
            // actual aspect is wider than target aspect
            // scale to height, leaving excess in horizontal
            gmImage.resize(null, options.height)
            rw = options.height * actualRatio // resizedWidth
            tx = Math.max(0, Math.round(rw * center - options.width / 2))    // prevent clipping on left
            tx = Math.min(tx, rw - options.width)                           // prevent clipping on right
          } else {
            // console.log('scaling to width')
            gmImage.resize(options.width, null)
            rh = options.width / actualRatio // resizedHeight
            ty = Math.max(0, Math.round(rh * center - options.height / 2))   // prevent clipping on top
            ty = Math.min(ty, rh - options.height)                          // prevent clipping on bottom
          }

          gmImage.crop(options.width, options.height, tx, ty)//, tx, ty)
          options.sharpen = options.sharpen || 2
        } else if (options) {
          gmImage.resize(options.width, options.height)
        }

        // sharpen pass
        if (options.sharpen) {
          var sharpenValue = parseInt(options.sharpen, 10)
          gmImage.sharpen(sharpenValue, sharpenValue / 5)
        }

        // add black letterboxing for background requests
        if (options.background) {
          gmImage
            .gravity("Center")
            .background("black")
            .extent(options.width, options.height)

          options.quality = options.quality || 98 // maximize quality for background renders
        }

        // quality filter (default = 80)
        options.quality = options.quality || 90
        if (options.quality) {
          gmImage.quality(options.quality)
        }

        console.log(`saving image fragment to ${savepath}...`)
        gmImage.write(savepath, (err) => {
          if (err) {
            console.error('error saving fragment', err)
            reject(err)
          } else {
            console.log('fragment saved to', savepath)
            fs.promises.readFile(savepath)
              .then(resolve)
              .catch(reject)
          }
        })
        // fs.promises.writeFile(savepath, image)
        //   .then(() => console.log('image fragment saved to', savepath))
        //   .catch(console.error)

        // return resolve(gmImage)
      })
    })
  })
})
