const roomFactory = require('./room')
const bookingFactory = require('./booking')

const room = roomFactory({
  state: {
    rooms: [
      { id: 'room-1', name: 'Design Lab' },
      { id: 'room-2', name: 'Clound and Networking' },
      { id: 'room-3', name: 'Programming' },
      { id: 'room-3', name: 'Robotics and IoT' },
    ],
  }
})

const booking = bookingFactory({
  state: {
    bookings: [
      {
        id: 'booking-1',
        roomId: 'room-1',
        userId: 'user-1',
        date: '2018-12-12',
        shiftId: 'shift-1',
      },
    ],
  }
})

module.exports = {
  room,
  booking
}

