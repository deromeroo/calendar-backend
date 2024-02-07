const express = require('express')
const dbConnection = require('./db/config')
const cors = require('cors')
require('dotenv').config()

//* Crear servidor
const app = express()

//DB
dbConnection()

//CORS
app.use(cors())

// Directorio publico
app.use(express.static('public'))

// Body: reading & parsing
app.use( express.json() )

// Rutas
app.use('/api/auth', require('./routes/auth')) //Authentication
app.use('/api/events', require('./routes/events')) //Events

//*Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Server port: ${process.env.PORT}`)
})