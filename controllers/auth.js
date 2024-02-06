const { response } = require('express');
const bcrypt = require('bcryptjs')
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
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please, contact to administration.'
        })
    }

}

const loginUser = (req, res = response) => {
    
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login',
        email, 
        password
    })
}

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}


module.exports = {
    createUser,
    loginUser,
    renewToken
}