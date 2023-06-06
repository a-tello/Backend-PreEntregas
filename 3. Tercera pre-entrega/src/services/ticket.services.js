import TicketManager from "../DAL/DAO/ticketManager.js"
import { getCartById } from "./carts.services.js"

const ticketManager = new TicketManager()


export const createTicket = async (data) => {
    console.log('ticket:', data.local);
    const code = await generateTicketCode()
    /* const products = await getCartById(data.user.cart)
    const amount = products.reduce((previous, current) => {
        return previous + current.quantity
      }, 0);    
    
    const purchaser = data.user.email */

    /* const ticket = {
        code,
        amount,
        purchase_datetime: Date.now(),
        purchaser
    }
    return await ticketManager.createOne(ticket) */
}

const generateTicketCode = async () => {
    const lastTicket = await ticketManager.findOne({limit:1})
    console.log('lasticket:',lastTicket);
    if(!lastTicket.length) return 'tckt001'

    const newCode = parseInt(lastTicket.code.slice(4)) + 1
    return newCode
}