import { createTicket } from "../services/ticket.services.js"

export const generateTicket = async (req, res) => {
    return await createTicket(req)
}