import express from 'express'
import { getImage } from './imager'
import fs from 'fs'

const app = express()

// single route catches all requests to imager and passes them to worker
app.get('*.(png|jpg)', (req, res) => {
  getImage(req.path)
    .then(({ image, path }) => {
      res.set('Content-Type', 'image/jpeg')
      res.set('Cache-Control', "public, max-age=345600") // 4 days
      res.set('Expires', new Date(Date.now() + 345600000).toUTCString())

      let filestream = fs.createWriteStream(path)

      image.stream(function (err, stdout, stderr) {
        stdout.pipe(res)
        stdout.pipe(filestream)
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send(err)
    })
})

export default app

