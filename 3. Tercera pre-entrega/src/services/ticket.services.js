import TicketManager from "../DAL/DAO/ticketManager.js"

const ticketManager = new TicketManager()


export const createTicket = async (user, products) => {
    const code = await generateTicketCode()
    const amount = products.reduce((previous, current) => {
        const price = current.product.price * current.quantity
        return previous + price
      }, 0);    
    const purchaser = user.email
    const ticket = {
        code,
        amount,
        purchase_datetime: new Date(),
        purchaser
    }
    return await ticketManager.createOne(ticket)
}

const generateTicketCode = async () => {
    const lastTicket = await ticketManager.findLast()
    if(!lastTicket.length) {
        return 'tckt0001'}
    
    const newNumCode = parseInt(lastTicket[0].code.slice(4)) + 1
    return 'tckt' + newNumCode.toString().padStart(4, '0')
}