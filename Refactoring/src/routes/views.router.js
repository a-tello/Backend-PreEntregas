import { Router } from "express"
import ProductsManager from "../DAL/DAOs/products/productsMongo.js"
import CartManager from "../DAL/DAOs/carts/cartsMongo.js"
import { isLogged, notLogged } from "../utils.js"

const router = Router()
const productManager = new ProductsManager()
const cartManager = new CartManager()

router.get('/products', isLogged, async (req, res) => {
    const products = await productManager.getAll({},{lean:true, leanWithId:false})
    const user = req.cookies.User
    res.render("products", {user, data: {products: products.payload, cart:'6489c2b5a319c64305cc54ac'}})
})

router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartManager.getCartById(cid)
    res.render("carts", {cart})
})

router.get('/login', notLogged,  async (req, res) => {
    res.render("login")
})

    router.get('/signup', notLogged,  async (req, res) => {
    res.render("signup")
})

router.get('/profile', isLogged, async (req, res) => {
    const user = req.cookies.User
    res.render("profile", {user})
})

router.get('/error', async (req, res) => {
    res.render("error")
})


export default router