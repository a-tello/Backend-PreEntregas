import { Router } from 'express'
import ProductManager from '../dao/productManagerMongo.js'
import CartManager from '../dao/cartManagerMongo.js'

const router = Router()
const productManager = new ProductManager
const cartManager = new CartManager

router.get('/products', async (req, res) => {
    const {limit=10, page=1, sort=null,...query} = req.query
    
    try {
        const products = await productManager.getProducts(limit, page, query, sort)
        res.render('products',{style:'products.css', products:products.payload})
        
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


export default router