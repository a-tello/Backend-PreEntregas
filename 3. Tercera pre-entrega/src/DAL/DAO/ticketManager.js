import { ticketModel } from "../mongoDB/models/tickets.model.js"

export default class TicketManager {

    async createOne(data){
        try {
            return await ticketModel.create(data)
        } catch (err) {
            throw err
        }
    }

    async findOne(query) {
        try {
            return await ticketModel.find(query)
        } catch (err) {
            throw err
        }
    }
}