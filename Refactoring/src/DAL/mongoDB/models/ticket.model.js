import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required:true,
        unique:true
    },
    purchase_datetime: {
    },
    amount: {
        type: Number,
        required:true
    },
    purchaser: {
        type: String,
        required:true
    }
})

export const ticketModel = mongoose.model('ticket', ticketSchema)