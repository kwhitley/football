import express from 'express'
import gm from 'gm'
import fs from 'fs'
import Path from 'path'
import _ from 'lodash'
import { download } from './dropbox'
const isProduction = process.env.NODE_ENV === 'production'

const app = express()

app.get('*', async (req, res) => {
  let decodedPath = decodeURI(req.path)
  let optionsSegment = decodedPath.replace(/^.*::(.*)\.\w{3,4}$/i, '$1') || ''
  let originalPath = decodedPath.replace(/^(.*)(::.*)(\.\w{3,4})$/g, '$1$3')
  let options = optionsSegment
                  .split(',')
                  .reduce((a, b) => {
                    let [ key, value ] = b.split('=')
                    a[key] = value !== undefined ? Number(value) : true

                    return a
                  }, {})

  // begin: save final output and stream output to response
  let savefolder = Path.join(__dirname, `../${isProduction ? 'dist' : '.dist-dev'}/client`)
  let savepath = savefolder + req.originalUrl
  let [ fullpath, folder ] = req.path.match(/(.*)\/(.*)/) || []

  console.log('IMAGER', {
    decodedPath,
    optionsSegment,
    options,
    originalPath,
    folder,
  })

  if (options.width && options.height) {
    options.targetRatio = options.width / options.height
    if (!options.background && !options.fit) {
      options.crop = true
    }
  }

  let image = await fs.promises.readFile(savefolder + originalPath).catch(console.error)

  if (!image) {
    image = await download(originalPath)
    console.log('image file loaded from dropbox')
  } else {
    console.log('image binary loaded from local content')
  }

  if (!image) return res.status(404).send('Image not found in database')

  let gmImage = gm(image)
  console.log('gmImage', gmImage)

  gmImage.orientation(async function(err, orientation) {
    err && console.log('orientation.error', err)

    gmImage.size(async function(err, geometry) {
      err && console.log('geometry.error', err)

      if (!geometry) {
        console.error(`Image geometry not found for ${req.path}`)
        return res.status(500).send(`Image geometry not found for ${req.path}`)
      }

      let { height, width } = geometry

      console.log('size', { height, width })

      switch requested dimensions
      if (orientation === 'RightTop') {
        let temp = options.width
        options.width = options.height
        options.height = temp
        options.targetRatio = options.height && (options.width / options.height)
      }

      if (err) {
        return res.status(500).send(err)
      }

      let actualRatio = width / height
      console.log('actual aspect ratio', actualRatio)
      console.log('actual height', height)
      console.log('actual width', width)

      gmImage.setFormat('jpg')

      // black and white filter
      if (options.mono) {
        gmImage.type('GrayScale')
      }

      // negative filter
      if (options.negative) {
        gmImage.negative()
      }


      gmImage.autoOrient()

      if (options.crop) {
        let rw, rh
        let center = !_.isUndefined(options.center) ? parseFloat(options.center, 10) : 0.5
        console.log('target aspect ratio', options.targetRatio)
        let tx = 0
        let ty = 0

        console.log('cropping')

        if (actualRatio > options.targetRatio) {
          // actual aspect is wider than target aspect
          // scale to height, leaving excess in horizontal
          console.log('scaling to height')
          gmImage.resize(null, options.height)
          rw = options.height * actualRatio // resizedWidth
          console.log('resized width', rw)
          tx = Math.max(0, Math.round(rw * center - options.width / 2))    // prevent clipping on left
          tx = Math.min(tx, rw - options.width)                           // prevent clipping on right
        } else {
          console.log('scaling to width')
          // scale to width, leaving excess in vertical
          gmImage.resize(options.width, null)
          rh = options.width / actualRatio // resizedHeight
          console.log('resized height', rh)
          ty = Math.max(0, Math.round(rh * center - options.height / 2))   // prevent clipping on top
          ty = Math.min(ty, rh - options.height)                          // prevent clipping on bottom
        }

        console.log('final crop', { height: options.height, width: options.width, tx, ty })

        gmImage.crop(options.width, options.height, tx, ty)//, tx, ty)
        options.sharpen = options.sharpen || 2
      } else if (options) {
        console.log('resizing', options.width, options.height)
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

      // allow for any additional filter to be ran via "gm-[filtername]=[value]"
      _.each(options, function(valueStr, key) {
        if (key.match(/^gm-\w+$/)) {
          var values  = valueStr.split(',')
          _.map(values, function(value) {
            return _.isNumber(value) ? parseFloat(value) : value
          })

          var value   = values[0]
          key = key.replace(/^gm-/,'')

          if (['blur', 'sharpen'].indexOf(key) !== -1) {
            sigma = value / 3
          }
          gmImage[key].apply(gmImage[key], values)
        }
      })


      console.log('ready to save...')

      // ensure folder exists before file stream opening
      await fs.promises.mkdir(savefolder + '/i' + folder, { recursive: true }).catch(console.error)

      savepath = fs.createWriteStream(savepath)

      res.set('Content-Type', 'image/jpeg')
      res.set('Cache-Control', "public, max-age=345600") // 4 days
      res.set('Expires', new Date(Date.now() + 345600000).toUTCString())

      gmImage.stream(function (err, stdout, stderr) {
        stdout.pipe(res)

        if (savepath) {
          stdout.pipe(savepath)
        }
      })
    })
  })
})

app.get('*', (req, res) => res.sendStatus(403))

export default app
