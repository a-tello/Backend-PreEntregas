import express from "express"
import config from "./config.js"
import './DAL/mongoDB/dbConfig.js'

// import para test
import ProductsManager from "./DAL/DAOs/products/productsMongo.js"
import UsersManager from "./DAL/DAOs/users/usersMongo.js"
const productsManager = new ProductsManager()
const usersManager = new UsersManager()


const PORT = config.port
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
     

// INICIO TEST

app.get('/getProducts', async (req, res) => {
    const products = await productsManager.getAll()
    res.json(products)
})

app.get('/getProduct/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await productsManager.getOneById(id)
        res.json(product)
    } catch (err) {
        res.json(err)
    }
    
})

app.post('/createProduct', async (req, res) => {
    const { ...product } = req.body
    const newProduct = await productsManager.createOne(product)
    res.json(newProduct)
})

app.put('/updateProduct/:id', async (req, res) => {
    const { id } = req.params
    const newData = req.body
    const updatedProduct = await productsManager.updateOne(id, newData)
    res.json({message:'Product updated successfully', updatedProduct})
})

app.delete('/deleteProduct/:id', async (req, res) => {
    const { id } = req.params
    const product = await productsManager.deleteOne(id)
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
// FIN TEST





app.listen(PORT,() => console.log(`Listen on port ${PORT}`))
    