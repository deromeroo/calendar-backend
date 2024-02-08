/* 
    Event Routes
    /api/events
    CRUD 
*/
const { Router } = require('express')
const { check } = require('express-validator')

const { fieldValidator } = require('../middlewares/field-validator')
const { jwtValidator } = require('../middlewares/jwt-validator')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { isDate } = require('../helpers/isDate')

const router = Router()

//All validate jwt
router.use( jwtValidator )

//getEvents
router.get('/', getEvents)

//createEvents
router.post(
    '/', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Starting date is required').custom( isDate ),
        check('end', 'Ending date is required').custom( isDate ),
        fieldValidator
    ],
    createEvent)

//updateEvent
router.put('/:id', updateEvent)

//deleteEvent
router.delete('/:id', deleteEvent)


module.exports = router