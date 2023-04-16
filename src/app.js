import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import './db/dbConfig.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import chatRouter from './routes/chat.router.js'
import { Server } from 'socket.io'
import MessageManager from './dao/messagesManagerMongo.js'
import { messagesModel } from './db/models/messages.model.js'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
 
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/products', productsRouter)
app.use('/carts', cartsRouter)
app.use('/chat', chatRouter)



const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

const socketServer = new Server(httpServer)
const messageManager = new MessageManager()

socketServer.on('connection', async (socket) => {
    console.log(`${socket.id} connected`)

    socket.on('message', async info => {
        await messageManager.addMessage(info)
        const updatedMessages = await messageManager.getMessages()
        socketServer.emit('chat', updatedMessages)
    })

    socket.on('userConnected', username => {
        socket.broadcast.emit('alertUserConnected', username)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })

})
