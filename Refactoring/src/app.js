import express from "express"
import config from "./config.js"
import { __dirname } from "./utils.js"
import './DAL/mongoDB/dbConfig.js'

// ROUTERS
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import chatRouter from "./routes/chat.router.js"
import viewsRouter from "./routes/views.router.js"

import handlebars from 'express-handlebars'

// import para test
import ProductsManager from "./DAL/DAOs/products/productsMongo.js"
import UsersManager from "./DAL/DAOs/users/usersMongo.js"
import CartManager from "./DAL/DAOs/carts/cartsMongo.js"
const productsManager = new ProductsManager()
const usersManager = new UsersManager()
const cartManager = new CartManager()


const PORT = config.port
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
     

/* // INICIO TEST

app.get('/getProduct/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await productsManager.getOneById(id)
        if(!product) return res.json({error:`Product with ID ${id} not found`})
        res.json(product)
    } catch (err) {
        res.json(err)
    }
    
})

app.post('/addProduct', async (req, res) => {
    const { ...product } = req.body
    const newProduct = await productsManager.createOne(product)
    res.json(newProduct)
})

app.put('/updateProduct/:id', async (req, res) => {
    const { id } = req.params
    const newData = req.body
    const updatedProduct = await productsManager.updateOne(id, newData)
    if(!updatedProduct) return res.json({error:`Product with ID ${id} not found`})
    res.json({message:'Product updated successfully', updatedProduct})
})

app.delete('/deleteProduct/:id', async (req, res) => {
    const { id } = req.params
    const product = await productsManager.deleteOne(id)
    if(!product) return res.json({error:`Product with ID ${id} not found`})
    res.json({message:'Product removed successfully', product})
})
//-----------------------------------------------------------------
app.get('/getUsers', async (req, res) => {
    const user = await usersManager.getAll()
    res.json(user)
})

app.get('/getUser/:id', async (req, res) => {
    try {
        const {id} = req.params
        const user = await usersManager.getOneById(id)
        res.json(user)
    } catch (err) {
        res.json(err)
    }
    
})

app.post('/createUser', async (req, res) => {
    const userData = req.body
    const newUser = await usersManager.createOne(userData)
    res.json(newUser)
})
//--------------------------------------------------------

app.post('/createCart', async (req, res) => {
    const cart = await cartManager.createOne([])
    res.json({cart})
})

app.get('/getCart/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartManager.getCart(cid)
    res.json({cart})
})

app.post('/addProduct/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const cart = await cartManager.addProductToCart(cid, pid)
    res.json({cart})
})

// FIN TEST */
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine(
    {
        helpers:{
            link: (url, variable) => `${url}${variable}`,
            link_purchase: (url, variable) => `${url}${variable}/purchase`
            
        }
    }
))
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/chat', chatRouter)
app.use('/views', viewsRouter)

export const httpServer = app.listen(PORT,() => console.log(`Listen on port ${PORT}`))
    