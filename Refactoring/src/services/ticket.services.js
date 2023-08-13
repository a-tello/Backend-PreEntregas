import {ticketManager} from '../DAL/DAOs/ticket/ticketManager.js'

class TicketService {

    async createTicket (email, products) {
        
        const code = await this.generateTicketCode()
        const amount = products.reduce((previous, current) => {
            const price = current.product.price * current.quantity
            return previous + price
          }, 0);    
        const purchaser = email
        const ticket = {
            code,
            amount,
            purchase_datetime: new Date(),
            purchaser
        }
        return await ticketManager.createOne(ticket)
    }
    
    async generateTicketCode () {
        const lastTicket = await ticketManager.findLast()
        if(!lastTicket.length) {
            return 'tckt0001'}
        
        const newNumCode = parseInt(lastTicket[0].code.slice(4)) + 1
        return 'tckt' + newNumCode.toString().padStart(4, '0')
    }
}

export const ticketService = new TicketService()