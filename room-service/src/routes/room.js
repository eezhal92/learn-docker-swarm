const Router = require('express').Router
const booking = require('./booking')
const { room: roomSrv } = require('../db')

const route = Router()

route.get('/', (request, response) => {
  roomSrv.getRooms()
    .then((rooms) => {
      response.json(rooms)
    })
})

route.use('/:roomId/bookings', booking)

module.exports = route
