import express from 'express'
import { getImage } from './imager.js'

const app = express()

// single route catches all requests to imager and passes them to worker
app.get('*.(png|jpg)', (req, res) => {
  getImage(req.path)
    .then((image) => {
      res.type('image/jpeg')
      res.set('Cache-Control', "public, max-age=345600") // 4 days
      res.set('Expires', new Date(Date.now() + 345600000).toUTCString())

      res.end(image)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send(err)
    })
})

export default app

