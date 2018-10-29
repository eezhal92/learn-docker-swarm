const Router = require('express').Router
const room = require('./room')

const route = Router()

route.use('/rooms', room)

module.exports = route
