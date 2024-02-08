const { response } = require('express');

//GET EVENTS
const getEvents = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getEvents'
    })
}

//CREATE EVENTS
const createEvent = (req, res = response) => {

    //Validate 
    console.log(req.body)

    res.json({
        ok: true,
        msg: 'createEvent'
    })
}

//Update EVENTS
const updateEvent = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'updateEvent'
    })
}

//DELETE Events
const deleteEvent = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteEvent'
    })
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
