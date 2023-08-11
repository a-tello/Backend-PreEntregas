import express from "express"
import config from "./config.js"
import { __dirname } from "./utils.js"
import './DAL/mongoDB/dbConfig.js'

// ROUTERS
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import chatRouter from "./routes/chat.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import viewsRouter from "./routes/views.router.js"
import usersRouter from "./routes/users.router.js"

import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser'
import passport from "passport"

const PORT = config.port
const app = express()
app.use(passport.initialize());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine(
    {
        helpers:{
            link: (url, variable) => `${url}${variable}`,
            link_purchase: (url, variable) => `${url}${variable}/purchase`,
            addToCart: (pid, cid) => console.log(pid, cid)
            
        }
    }
))
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/chat', chatRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/users', usersRouter)
app.use('/views', viewsRouter)
app.use('/', (req, res) => res.redirect('/views/login'))


export const httpServer = app.listen(PORT,() => console.log(`Listen on port ${PORT}`))
    