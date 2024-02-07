/* 
    User Routes / Auth
    Host + api/auth
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/field-validator')
const { createUser, loginUser, renewToken } = require('../controllers/auth')
const { jwtValidator } = require('../middlewares/jwt-validator')

const router = Router()

//Register
router.post(
    '/new', 
    [ //Middlewares
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must contain more than 6 characters').isLength({ min: 6 }),
        fieldValidator
    ], 
    createUser)

//Login
router.post(
    '/', 
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must contain more than 6 characters').isLength({ min: 6 }),
        fieldValidator
    ],
    loginUser)

//Token Renew
router.get('/renew', jwtValidator ,renewToken)


module.exports = router