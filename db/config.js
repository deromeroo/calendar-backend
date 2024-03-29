const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.DB_CNN );
    } catch (error) {
        console.log(error)
        throw new Error('DB init error')
    }

    console.log('DB Online')
}

module.exports = dbConnection