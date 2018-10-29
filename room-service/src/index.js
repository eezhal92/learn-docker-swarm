const express  = require('express')
const fetch = require('isomorphic-fetch')
const bodyParser = require('body-parser')

const routes = require('./routes')
const app = express()
const cors = require('cors')

app.use(cors({
  origin: '*'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = 3000

app.use(routes)
app.get('/bookings', (request, response) => {
  response.json({
    origin: 'room-service',
    bookings: [
      { id: 1, userId: 'xxx' },
    ]
  })
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
