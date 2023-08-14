import { Router } from "express"
import { productService } from "../services/products.services.js"
import { cartService } from "../services/carts.services.js"
import { jwtValidation, roleAuthorization } from "../middlewares/auth.middleware.js"
import config from "../config.js"
import jwt from 'jsonwebtoken'
import { userService } from "../services/users.services.js"

const router = Router()


router.use(jwtValidation)

router.get('/login', (req, res) => {
    if(req.user?.isLogged) return res.redirect('/views/products')
   
    return res.render("login")
})

router.get('/signup',  async (req, res) => {
    if(req.user?.isLogged) return res.redirect('/views/products')

    return res.render("signup")
})

router.get('/reset', (req, res) => {
    if(req.user?.isLogged) return res.redirect('/views/products')

    res.render('reset')
})

router.get('/resetPassword', (req, res, next) => {
    const { token } = req.query

    if(req.user?.isLogged || !token) return res.redirect('/views/products')
    try {
        if(jwt.verify(token, config.secretKeyTkn)) {
            res.cookie('Authorization', token.toString())
            return res.render('newPassword')
        }
    } catch (error) {
        console.log(error.message);
        res.send('El enlace ha expirado. Genere un nuevo enlace')
    }
})


router.get('/products',
    async (req, res) => { 

    if(!(req.user?.isLogged)) return res.redirect('/')

    const products = await productService.getAll({},{lean:true, leanWithId:false})
    const user = req.user
    console.log({user});    
    const token = req.cookies.Authorization
    return res.render("products", {user, data: {products: products.payload, cart:   user.cart?.toString(), token}})
})

router.get('/carts/:cid', async (req, res) => {
    if(!(req.user?.isLogged)) return res.redirect('/')

    const {cid} =req.params
    const cart = await cartService.getCart({_id:cid})
    return res.render("carts", {cart:cart[0]})
})

router.get('/profile', async (req, res) => {
    if(!(req.user?.isLogged)) return res.redirect('/')

    const user = req.user
    return res.render("profile", {user})
})

router.get('/error', async (req, res) => {
    if(!(req.user?.isLogged)) return res.redirect('/')

    return res.render("error")
})

router.get('/users', roleAuthorization('Admin'), async (req, res) => { 
    if(!(req.user?.isLogged)) return res.redirect('/')


    const users = await userService.getAllUsers()
    const token = req.cookies.Authorization

    return res.render("usersPanel", {users, token})
})


export default router