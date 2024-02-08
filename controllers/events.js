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
const updateEvent = async (req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {
        
        const event = await Event.findById( eventId )

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: "Event doesn't exist"
            })
        }

        if ( event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Invalid credentials to modify event'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

        res.json({
            ok: true,
            event: eventUpdated
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Contact administration"
        })
    }
}

//DELETE Events
const deleteEvent = async (req, res = response) => {


    const eventId = req.params.id
    const uid = req.uid

    try {
        
        const event = await Event.findById( eventId )

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: "Event doesn't exist"
            })
        }

        if ( event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Invalid credentials to delete event'
            })
        }

       await Event.findByIdAndDelete(eventId)

        res.json({
            ok: true,
            msg: 'Successful event elimination'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Contact administration"
        })
    }
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
