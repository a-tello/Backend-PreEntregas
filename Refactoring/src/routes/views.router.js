import { Router } from "express"
import { productService } from "../services/products.services.js"
import { cartService } from "../services/carts.services.js"
import passport from "passport"
import { jwtValidation, roleAuthorization } from "../middlewares/auth.middleware.js"

const router = Router()



router.get('/login', (req, res) => {
    if(req.cookies.Authorization) return res.redirect('/views/products')
   
    return res.render("login")
})

router.get('/signup',  async (req, res) => {
    if(req.cookies?.Authorization) return res.redirect('/views/products')

    return res.render("signup")
})

// JWT validation for all routes ↓

router.get('/products', jwtValidation,
    async (req, res) => { 

    const products = await productService.getAll({},{lean:true, leanWithId:false})
    const user = req.user
    console.log({user});
    return res.render("products", {user, data: {products: products.payload, cart:'649d7397dbbd37853b9349d4'}})
})

router.get('/carts/:cid', jwtValidation, async (req, res) => {

    const {cid} =req.params
    const cart = await cartService.getCart({_id:cid})
    return res.render("carts", {cart:cart[0]})
})

router.get('/profile', jwtValidation, async (req, res) => {

    const user = req.user
    return res.render("profile", {user})
})

router.get('/error', jwtValidation, async (req, res) => {
    return res.render("error")
})


export default router