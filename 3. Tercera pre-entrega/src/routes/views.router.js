import { Router } from 'express'
import CartManager from '../DAL/DAO/cartManagerMongo.js'
import { getProducts } from '../services/products.services.js'
import { purchase } from '../controllers/carts.controller.js'
import { jwtValidator } from '../middleware/jwt.middleware.js'

const router = Router()
const cartManager = new CartManager

router.get('/products',jwtValidator, async (req, res) => {
    const {limit=10, page=1, sort=null, code=null, ...query} = req.query
    
    try {
        const products = await getProducts(limit, page, query, sort);
        res.render('products',{style:'products.css', products:products.payload, user:req.user})
        
    } catch(error) {
        res.status(error.code).json({error: error.message})

    }
})

router.get('/carts/:cid', async (req, res) => {
    const {cid} = req.params
        
    try {
        const cart = await cartManager.getCartById(cid)
        res.render('carts',{style:'cart.css', cart:cart})
    } catch(error) {
        res.status(error.code).json({error: error.message})
    } 

})

router.get('/login', (req, res) => {
    if(req.user?.isLogged) {
        return res.redirect('/views/products')
    }
    if(req.err?.messages){
        delete req.err.messages
    }
    res.render('login')
})

router.get('/signup', (req, res) => {
    if(req.user?.email) {
        return res.redirect('/views/products')
    }
    if(req.err?.messages){
        delete req.err.messages
    }
    res.render('signup')
})

router.get('/profile', jwtValidator, (req, res) => {
    if(!req.user?.email) {
        res.redirect('/views/login')
        return
    }
    res.render('profile', {user:req.user})
})

router.get('/ticket', async (req, res) => {
    await purchase(req, res)
    res.send("Compra Exitosa")
})

router.get('/error',  (req, res) => {
    if(req.user?.email) {
        res.redirect('/views/products')
    }
    const error = req.cookies.error
    res.clearCookie('error')
    res.render('error', {err: error})
})


export default router