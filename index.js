const express = require('express')
require('dotenv').config()

//* Crear servidor
const app = express()


// Directorio publico
app.use(express.static('public'))

// Body: reading & parsing
app.use( express.json() )

// Rutas
app.use('/api/auth', require('./routes/auth')) //Authentication
// TODO: CRUD todos

//*Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Server port: ${process.env.PORT}`)
})