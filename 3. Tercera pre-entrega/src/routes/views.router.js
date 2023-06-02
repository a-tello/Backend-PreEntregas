import { Router } from 'express'
import ProductManager from '../DAL/productManagerMongo.js'
import CartManager from '../DAL/cartManagerMongo.js'
import { getProducts } from '../services/products.services.js'

const router = Router()
const productManager = new ProductManager
const cartManager = new CartManager

router.get('/products', async (req, res) => {
    const {limit=10, page=1, sort=null, code=null, ...query} = req.query
    
    try {
        const products = await getProducts(limit, page, query, sort)
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

router.get('/login',  (req, res) => {
    if(req.session?.passport) {
        return res.redirect('/views/products')
    }
    if(req.session?.messages){
        delete req.session.messages
    }
    res.render('login')
})

router.get('/signup',  (req, res) => {
    if(req.user?.email) {
        return res.redirect('/views/products')
    }
    if(req.session?.messages){
        delete req.session.messages
    }
    res.render('signup')
})

router.get('/profile',  (req, res) => {
    if(!req.user?.email) {
        res.redirect('/views/login')
        return
    }
    res.render('profile', {user:req.user})
})

router.get('/error',  (req, res) => {
    if(req.user?.email) {
        res.redirect('/views/products')
    }
    res.render('error', {err: req.session.messages[0]})
})


export default router