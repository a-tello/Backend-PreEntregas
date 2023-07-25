import { Router } from "express"
import ProductsManager from "../DAL/DAOs/products/productsMongo.js"
import CartManager from "../DAL/DAOs/carts/cartsMongo.js"
import { jwtValidatorCookie, jwtValidatorHeader } from "../middlewares/jwt.middleware.js"
import { getAll } from "../services/products.services.js"
import { getCart, getCartById } from "../services/carts.services.js"

const router = Router()

router.get('/test', jwtValidatorHeader, (req, res) => {
    console.log('Autorizado por header');
})

router.get('/products', jwtValidatorCookie, async (req, res) => {
    if(!req.user?.isLogged) return res.redirect('views/login')

    const products = await getAll({},{lean:true, leanWithId:false})
    const user = req.user
    return res.render("products", {user, data: {products: products.payload, cart:'649d7397dbbd37853b9349d4'}})
})

router.get('/carts/:cid', jwtValidatorCookie, async (req, res) => {
    //if(!req.user?.isLogged) return res.redirect('/login')

    const {cid} =req.params
    console.log({cid});
    const cart = await getCart({_id:cid})
    return res.render("carts", {cart:cart[0]})
})

router.get('/login', jwtValidatorCookie, (req, res) => {
    if(req.user?.isLogged) return res.redirect('/views/products')
    return res.render("login")
})

router.get('/signup', jwtValidatorCookie,  async (req, res) => {
    if(req.user?.isLogged) return res.redirect('/views/products')

    return res.render("signup")
})

router.get('/profile', jwtValidatorCookie, async (req, res) => {
    if(!req.user?.isLogged) return res.redirect('/views/login')

    const user = req.user
    return res.render("profile", {user})
})

router.get('/error', async (req, res) => {
    return res.render("error")
})


export default router