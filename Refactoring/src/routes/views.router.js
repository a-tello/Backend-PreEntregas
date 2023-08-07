import { Router } from "express"
import { jwtValidator } from "../middlewares/jwt.middleware.js"
import { productService } from "../services/products.services.js"
import { cartService } from "../services/carts.services.js"
import passport from "passport"

const router = Router()

router.get('/test', jwtValidator, (req, res) => {
    console.log('Autorizado por header');
})

router.get('/products', passport.authenticate('jwt', {session:false}), async (req, res) => {
    console.log('entra products');
    if(!req.user?.isLogged) return res.redirect('views/login')

    const products = await productService.getAll({},{lean:true, leanWithId:false})
    const user = req.user
    return res.render("products", {user, data: {products: products.payload, cart:'649d7397dbbd37853b9349d4'}})
})

router.get('/carts/:cid', jwtValidator, async (req, res) => {
    //if(!req.user?.isLogged) return res.redirect('/login')

    const {cid} =req.params
    console.log({cid});
    const cart = await cartService.getCart({_id:cid})
    return res.render("carts", {cart:cart[0]})
})

router.get('/login', jwtValidator, (req, res) => {
    if(req.user?.isLogged) return res.redirect('/views/products')
    return res.render("login")
})

router.get('/signup', jwtValidator,  async (req, res) => {
    if(req.user?.isLogged) return res.redirect('/views/products')

    return res.render("signup")
})

router.get('/profile', jwtValidator, async (req, res) => {
    if(!req.user?.isLogged) return res.redirect('/views/login')

    const user = req.user
    return res.render("profile", {user})
})

router.get('/error', async (req, res) => {
    return res.render("error")
})


export default router