/* 
    Event Routes
    /api/events
    CRUD 
*/
const { Router } = require('express')
const { jwtValidator } = require('../middlewares/jwt-validator')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')

const router = Router()

//getEvents
router.get('/', jwtValidator, getEvents)

//createEvents
router.post('/create', jwtValidator, createEvent)

//updateEvent
router.put('/:id', jwtValidator, updateEvent)

//deleteEvent
router.delete('/:id', jwtValidator, deleteEvent)


module.exports = router