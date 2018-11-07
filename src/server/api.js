import express from 'express'

// create an express app
const app = express()

// add a route
app.get('/test', (req, res) => {
  // send a JSON response
  res.json({
    success: true,
    date: new Date(),
    foo: 'bar',
  })
})

// export the express app
export default app
