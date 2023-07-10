const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

require('dotenv').config()
const { MONGO_URL, PORT } = process.env

mongoose
    .connect(
        MONGO_URL, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

app.use(
    cors({
        origin: `http://localhost:${PORT}`,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
)

app.use(express.json())
