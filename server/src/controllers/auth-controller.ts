import { Request, Response } from 'express'
import User from '../models/user/user-model'
import { createSecretToken } from '../util/secret-token'
import { daysToMilliseconds } from '../util/dates'

export const signup = async (req: Request, res: Response, next: any) => {
    try {
        const { username, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const user = await User.create({ username, email, password, createdAt: new Date() })
        const token = createSecretToken(user._id.toString())
        res.cookie('token', token, { 
            httpOnly: true,
            maxAge: daysToMilliseconds(7)
        })

        res
            .status(201)
            .json({
                message: 'User created successfully',
                user: { username, email },
                success: true
            })

        next()
    } catch (err: any) {
        res
            .status(500)
            .json({
                message: err.message,
                success: false 
            })
    }
}
