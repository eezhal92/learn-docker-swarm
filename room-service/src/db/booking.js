const isValidShift = require('./shift').isValidShift
const util = require('./util')

/**
 * @typedef {object}  Booking
 * @property {string} id
 * @property {string} shiftId
 * @property {string} roomId
 * @property {string} date
 * @property {string} userId
 * @property {string} bookedAt
 */

function factory (options) {
  if (!options.state) {
    throw new Error(`Please provide 'state' options`)
  }

   /**
   * @type {Array<Booking>}
   */
  const bookings = options.state.bookings || []

  /**
   * @param  {Booking}  bookingRequest
   * @return {Boolean}
   */
  function isAvailable (bookingRequest) {
    if (!isValidShift(bookingRequest.shiftId)) {
      throw new Error(`${bookingRequest.shiftId} is not valid shift`)
    }

    const bookingsOnRequestedDate = bookings
      .filter(lending => lending.date === bookingRequest.date)
      .filter(lending => lending.roomId === bookingRequest.roomId)
      .filter(lending => lending.shiftId === bookingRequest.shiftId)

    return bookingsOnRequestedDate.length === 0
  }

  /**
   * Try to create new booking
   * @param  {Room} room
   * @param  {object} payload
   * @param  {string} payload.userId
   * @param  {string} payload.date
   * @param  {object} payload.shiftId
   */
  function book (room, payload) {
    const { userId, date, shiftId } = payload
    const bookingRequest = {
      roomId: room.id,
      userId,
      date,
      shiftId,
    }

    if (!isAvailable(bookingRequest)) {
      throw new Error(`Already booked!`)
    }

    let newBooking = createNewBooking(bookingRequest)
    newBooking = persistBooking(newBooking)

    return newBooking
  }

  function createNewBooking(bookingRequest) {
    const bookedAt = new Date().toISOString()

    return Object.assign({ bookedAt }, bookingRequest)
  }

  function persistBooking(bookingRequest) {
    bookings.push(bookingRequest)
    return bookingRequest
  }

  function getBookings() {
    return bookings
  }

  function getBookingsByRoomId(roomId) {
    return bookings.filter(booking => booking.roomId == roomId)
  }

  return {
    book,
    getBookings,
    getBookingsByRoomId,
  }
}

module.exports = factory
