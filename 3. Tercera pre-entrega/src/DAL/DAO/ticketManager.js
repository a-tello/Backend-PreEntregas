import { ticketModel } from "../mongoDB/models/tickets.model.js"

export default class TicketManager {

    async createOne(data){
        try {
            return await ticketModel.create(data)
        } catch (err) {
            throw err
        }
    }

    async findOne(query, params={}) {
        try {
            return await ticketModel.find(query, params)
        } catch (err) {
            throw err
        }
    }

    async findLast() {
        try {
            return await ticketModel.find().sort({$natural:-1})
        } catch (err) {
            throw err
        }
    }
}