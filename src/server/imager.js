import express from 'express'
import gm from 'gm'
import fs from 'fs'
import Path from 'path'
import _ from 'lodash'
import { download } from './dropbox'
const isProduction = process.env.NODE_ENV === 'production'

const app = express()
gm = gm.subClass({ imageMagick: true })

// var express       = require('express')
// var app           = module.exports = express()
// var _             = require('lodash')
// var collections   = require('./collections')
// var gm            = require('gm')
// var fs            = require('fs')
// var store         = require('../file-store')
// var Path          = require('path')

app.get('/:path', async (req, res) => {
  let targetSize  = null
  let p           = req.params.path
  let parts       = p.match(/[^\.]+/g)
  let path        = _.first(parts)
  let extension   = _.first(p.match(/\b\w+$/))   // .jpg, .jpeg, .png
  let size        = _.first(p.match(/\b(\d+x\d*)|(\d*x\d+)\b/))  // 300x, x33, 100x20
  let optionsStr  = _.without(parts, path, size, extension)
  let options     = {}
  let savepath    = null
  let imagePath = `/${path}.${extension}`

  if (!_.isEmpty(optionsStr)) {
    optionsStr = optionsStr.join('.').split(',')
    _.each(optionsStr, function(option) {
      var group = option.split('=')
      options[group[0]] = group.length === 2 ? (parseFloat(group[1]) || group[1]) : true;
    })
  }

  console.log('IMAGER', { path, size, options, extension, imagePath })

  if (!path.match(/^[\w_\-\s]+$/)) {
    res.setHeader("Cache-Control", "public, max-age=345600") // 4 days
    res.setHeader("Expires", new Date(Date.now() + 345600000).toUTCString())

    return res.send(404)
  }

  if (size) {
    size = size.split('x')
    targetSize = {
      width:  size[0],
      height: size[1]
    }

    if (targetSize.width && targetSize.height) {
      targetSize.ratio = targetSize.width / targetSize.height;
      if (!options.background && !options.fit) {
        options.crop = true;
      }
    }
  }

  let image = await download(imagePath)

  if (!image) return res.send(404, 'Image not found in database')

  // res.send('ok')
  //   if (extension === 'purge') {
  //     image.clearCache()
  //     return res.send('cache cleared for key ' + image._id)
  //   }

  //   store.getFile({ key: image._id, refresh: options.refresh }, function(err, resourcePath) {
      var gmImage = gm(image)

      gmImage.size(function(err, size) {
        if (err) {
          console.log('err getting size', err)
          return res.status(500).send(err)
        }

        let h = size.height;
        let w = size.width;
        let r = w / h;

        console.log('size', size)

        // if (extension) {
          gmImage.setFormat('jpg')
        // }

        // black and white filter
        if (options.mono) {
          gmImage.type('GrayScale')
        }

        // negative filter
        if (options.negative) {
          gmImage.negative()
        }

        // resize if barely off
        // if (options.background && targetSize.ratio) {
        //   console.log('ratio difference', Math.abs(r / targetSize.ratio - 1))
        //   if (Math.abs(r / targetSize.ratio - 1) < 0.1) {
        //     options.crop = true;
        //     options.background = false;
        //   }
        // }

        if (options.crop) {
          let rw, rh
          let center = !_.isUndefined(options.center) ? parseFloat(options.center, 10) : 0.5
          let tr = targetSize.width / targetSize.height // targetRatio
          let tx = 0
          let ty = 0

          if (r > tr) {
            // scale to height, leaving excess in horizontal
            gmImage.resize(null, targetSize.height)
            rw = targetSize.height * r; // resizedWidth
            tx = Math.max(0,Math.round(rw * center - targetSize.width / 2))    // prevent clipping on left
            tx = Math.min(tx, rw - targetSize.width)                           // prevent clipping on right
          } else {
            // scale to width, leaving excess in vertical
            gmImage.resize(targetSize.width, null)
            rh = targetSize.width / r; // resizedHeight
            ty = Math.max(0,Math.round(rh * center - targetSize.height / 2))   // prevent clipping on top
            ty = Math.min(ty, rh - targetSize.height)                          // prevent clipping on bottom
          }

          // final crop
          gmImage.crop(targetSize.width, targetSize.height, tx, ty)
          options.sharpen = options.sharpen || 2;
        } else if (targetSize) {
          gmImage.resize(targetSize.width, targetSize.height)
          options.sharpen = options.sharpen || 2;
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
            .extent(targetSize.width, targetSize.height)

          options.quality = options.quality || 98; // maximize quality for background renders
        }

        // quality filter (default = 80)
        options.quality = options.quality || 90;
        if (options.quality) {
          gmImage.quality(options.quality)
        }

        // allow for any additional filter to be ran via "gm-[filtername]=[value]"
        _.each(options, function(valueStr, key) {
          if (key.match(/^gm-\w+$/)) {
            var values  = valueStr.split(',')
            _.map(values, function(value) {
              return _.isNumber(value) ? parseFloat(value) : value;
            })

            var value   = values[0];
            key = key.replace(/^gm-/,'')
            console.log('image processing:', key, values)

            if (['blur', 'sharpen'].indexOf(key) !== -1) {
              sigma = value / 3;
            }
            console.log(gmImage[key])
            gmImage[key].apply(gmImage[key], values)
          }
        })

        savepath = Path.join(__dirname, `../${isProduction ? 'dist' : '.dist-dev'}/client/i/${req.params.path}`)
        console.log('saving image fragment @ ', savepath)

        // res.send('ok')

        savepath = fs.createWriteStream(savepath)

        res.set('Content-Type', extension ? 'image/' + extension : image.file.type)
        res.set('Cache-Control', "public, max-age=345600") // 4 days
        res.set('Expires', new Date(Date.now() + 345600000).toUTCString())
  //       // stream final processed image to response
        gmImage.stream(function (err, stdout, stderr) {
          stdout.pipe(res)

          if (savepath) {
            stdout.pipe(savepath)
          }
        })
  //     })
  //   })
  })
})

app.get('*', (req, res) => res.send(403))

export default app
