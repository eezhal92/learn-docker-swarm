const Router = require('express').Router
const { booking: bookingSrv, room: roomSrv } = require('../db')
const route = Router({ mergeParams: true })

route.get('/', async (request, response, next) => {
  const { roomId } = request.params

  const room = roomSrv.findById(roomId)

  if (!room) {
    return next(createRoomNotFoundError(roomId))
  }
  const bookings = await bookingSrv.getBookingsByRoomId(roomId)

  return response.json({ bookings })
})

route.post('/', async (request, response, next) => {
  const { roomId } = request.params
  const { userId, date, shiftId } = request.body

  const room = await roomSrv.findById(roomId)

  if (!room) {
    return next(createRoomNotFoundError(roomId))
  }

  let booking = null

  try {
    booking = await bookingSrv.book(room, {
      userId,
      date,
      shiftId,
    })
  } catch (error) {
    return next(error)
  }

  return response.json({
    booking
  })
})

function createRoomNotFoundError(roomId) {
  return new Error(`Room with ID: ${roomId} was not found`)
}

module.exports = route
