import mongoose from 'mongoose'

const usersSchema =  new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId, ref: 'carts',
        require: true
    },
    role: {
        type: String
    }
})

export const usersModel = mongoose.model('Users', usersSchema)