const { response } = require('express');
const bcrypt = require('bcryptjs')
const {generateJWT} = require('../helpers/jwt')
const User = require('../models/User')

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        //Validate user exists
        let user = await User.findOne({ email })
        
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists whit that email!'
            })
        }
        //Set User
        user = new User( req.body )

        //Encrypt password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt)

        //Save user - DB
        await user.save()

        //Generate JWT
        const token = await generateJWT(user.id, user.name)
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please, contact to administration.'
        })
    }

}

//LOgin User
const loginUser = async (req, res = response) => {
    
    const { email, password } = req.body;

    try {

        //Validate user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "User don't exists whit that email!"
            })
        }

        //Confirm password
        const validPassword = bcrypt.compareSync( password, user.password )

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password!'
            })
        }

        //Generate JWT
        const token = await generateJWT(user.id, user.name)

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please, contact to administration.'
        })
    }
}

const renewToken = async (req, res = response) => {

    const { uid, name } = req

    const token = await generateJWT(uid, name)

    res.json({
        ok: true,
        ui,
        name,
        token
    })
}


module.exports = {
    createUser,
    loginUser,
    renewToken
}