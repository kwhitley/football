import express from 'express'
import { getImage, getImageWorker } from './imager-worker'

const app = express()

// single route catches all requests to imager and passes them to worker
app.get('*.(png|jpg)', (req, res) => {
  getImage(req.path)
    .then((image) => {
      res.set('Content-Type', 'image/jpeg')
      res.set('Cache-Control', "public, max-age=345600") // 4 days
      res.set('Expires', new Date(Date.now() + 345600000).toUTCString())

      image.stream(function (err, stdout, stderr) {
        stdout.pipe(res)
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send(err)
    })
})

export default app

