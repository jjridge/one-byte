import mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
}

userSchema.pre('save', async function(next: any) {
    if (this.password) {
        this.password = await hashPassword(this.password)
    }

    next()
})

export default mongoose.model('User', userSchema)
