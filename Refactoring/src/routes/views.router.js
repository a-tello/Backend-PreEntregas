import { Router } from "express"
import ProductsManager from "../DAL/DAOs/products/productsMongo.js"
import CartManager from "../DAL/DAOs/carts/cartsMongo.js"

const router = Router()
const productManager = new ProductsManager()
const cartManager = new CartManager()

router.get('/products', async (req, res) => {
    const products = await productManager.getAll({},{lean:true, leanWithId:false})
    res.render("products", {data: {products: products.payload, cart:'6489c2b5a319c64305cc54ac'}})
})

router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartManager.getCartById(cid)
    res.render("carts", {cart})
})


export default router