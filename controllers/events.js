const { response } = require('express');
const Event = require('../models/Event')

//GET EVENTS
const getEvents = async (req, res = response) => {

    const events = await Event.find()
                                .populate('user', 'name')

    res.json({
        ok: true,
        events
    })
}

//CREATE EVENTS
const createEvent = async (req, res = response) => {

    const event = new Event( req.body )

    try {

        event.user = req.uid

        const savedEvent = await event.save()

        res.json({
            ok: true,
            event: savedEvent
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact administration'
        })
    }
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
