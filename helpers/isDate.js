//custom validator
const moment = require('moment')

const isDate = (value) => {

    if (!value) {
        return false
    }

    const date = moment( value )

    if (date.isValid()) {
        return true
    }
}

module.exports = { isDate }