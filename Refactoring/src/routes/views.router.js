import { Router } from "express"
import ProductsManager from "../DAL/DAOs/products/productsMongo.js"
import CartManager from "../DAL/DAOs/carts/cartsMongo.js"
import { jwtValidator } from "../middlewares/jwt.middleware.js"

const router = Router()
const productManager = new ProductsManager()
const cartManager = new CartManager()

router.get('/products', jwtValidator, async (req, res) => {
    if(!req.user?.isLogged) return res.redirect('views/login')
        
    const products = await productManager.getAll({},{lean:true, leanWithId:false})
    const user = req.user
    return res.render("products", {user, data: {products: products.payload, cart:'6489c2b5a319c64305cc54ac'}})
})

router.get('/carts/:cid', jwtValidator, async (req, res) => {
    if(!req.user?.isLogged) return res.redirect('/login')

    const { cid } = req.params
    const cart = await cartManager.getCartById(cid)
    return res.render("carts", {cart})
})

router.get('/login', jwtValidator,  async (req, res) => {
    if(req.user?.isLogged) return res.redirect('/views/products')
    return res.render("login")
})

router.get('/signup', jwtValidator,  async (req, res) => {
    if(req.user?.isLogged) return res.redirect('/views/products')

    return res.render("signup")
})

router.get('/profile', jwtValidator, async (req, res) => {
    if(!req.user?.isLogged) return res.redirect('/views/login')

    const user = req.cookies.User
    return res.render("profile", {user})
})

router.get('/error', async (req, res) => {
    return res.render("error")
})


export default router