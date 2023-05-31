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
    }
})

export const usersModel = mongoose.model('Users', usersSchema)