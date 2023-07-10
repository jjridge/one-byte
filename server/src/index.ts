import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth-route'

const app: Express = express()

dotenv.config()
const MONGO_URL: string = process.env.MONGO_URL || 'mongodb://localhost:27017/mern-auth'
const PORT: string | number = process.env.PORT || 4000

mongoose
    .connect(MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch((err: any) => console.log(err))

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

app.use(cookieParser())

app.use(express.json())

app.use('/api/auth', authRoute)

export {}
