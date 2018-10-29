function factory (options) {
  if (!options.state) {
    throw new Error(`Please provide 'state' options`)
  }

  const rooms = options.state.rooms || []

  function getRooms() {
    return Promise.resolve(rooms)
  }

  function findById (roomId) {
    return rooms.find(room => room.id === roomId) || null
  }

  return {
    getRooms,
    findById,
  }
}

module.exports = factory
