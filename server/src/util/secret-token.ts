import dotenv from 'dotenv'
dotenv.config()
import * as jwt from 'jsonwebtoken'
import { daysToSeconds } from './dates'

export const createSecretToken = (id: string) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY as string, {
        expiresIn: daysToSeconds(7)
    })
}
