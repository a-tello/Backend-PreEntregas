import MessagesManager from "../DAL/DAOs/messages/messagesMongo.js"
import { Router } from "express"
import { httpServer } from "../app.js"
import { Server } from 'socket.io'
import { jwtValidation, roleAuthorization } from "../middlewares/auth.middleware.js"

const router = Router()

router.get('/', jwtValidation, roleAuthorization('User'),(req, res) => {
    res.render('chat')
    const socketServer = new Server(httpServer)
    const messagesManager = new MessagesManager()

    socketServer.on('connection', async (socket) => {
        console.log(`${socket.id} connected`)

        socket.on('message', async info => {
            await messagesManager.addMessage(info)
            const updatedMessages = await messagesManager.getMessages()
            socketServer.emit('chat', updatedMessages)
        })

        socket.on('userConnected', username => {
            socket.broadcast.emit('alertUserConnected', username)
        })

        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected`)
        })
    })
})

export default router